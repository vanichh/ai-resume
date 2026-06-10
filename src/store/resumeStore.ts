import { create } from 'zustand';

import { loadResumeWorkspace, saveResumeWorkspace } from '@common/utils/resumeWorkspaceStorage';

import { analyzeResume, getLanguageModelStatus } from '@services/resume-advisor';
import { parseResumeFile } from '@services/resume-parser';
import { translateResume } from '@services/resume-translator';

import { MIN_RESUME_TEXT_LENGTH, MODEL_HINTS } from './common/constants';
import { canUseModel } from './common/utils/canUseModel';
import { getErrorMessage } from './common/utils/getErrorMessage';

import type { ResumeState, ResumeStore } from './types';

const initialState: ResumeState = {
  advice: null,
  downloadProgress: null,
  error: '',
  fileName: '',
  modelHint: '',
  modelStatus: 'checking',
  resumeText: '',
  status: 'idle',
  targetRole: '',
  translation: null,
  translationHistory: [],
  translationLanguage: 'english',
  translationTone: 'atsFriendly',
  vacancyText: '',
};

function persistWorkspace(state: ResumeStore): void {
  saveResumeWorkspace({
    advice: state.advice,
    resumeText: state.resumeText,
    targetRole: state.targetRole,
    translation: state.translation,
    translationHistory: state.translationHistory,
    translationLanguage: state.translationLanguage,
    translationTone: state.translationTone,
    vacancyText: state.vacancyText,
  });
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  ...initialState,

  async analyze() {
    const { resumeText, targetRole } = get();

    set({
      advice: null,
      downloadProgress: null,
      error: '',
      status: 'analyzing',
    });

    try {
      const advice = await analyzeResume(resumeText, targetRole, (downloadProgress) => {
        set({ downloadProgress });
      });

      set({
        advice,
        status: 'done',
      });
      persistWorkspace(get());
    } catch (caught) {
      set({
        error: getErrorMessage(caught, 'Не удалось получить рекомендации.'),
        status: 'error',
      });
    }
  },

  async checkModelStatus() {
    try {
      const modelStatus = await getLanguageModelStatus();

      set({
        modelHint: MODEL_HINTS[modelStatus] ?? '',
        modelStatus,
      });
    } catch {
      set({
        modelHint: MODEL_HINTS.unavailable,
        modelStatus: 'unavailable',
      });
    }
  },

  clearError() {
    set({ error: '' });
  },

  async parseFile(file) {
    set({
      advice: null,
      downloadProgress: null,
      error: '',
      fileName: file.name,
      status: 'parsing',
      translation: null,
    });

    try {
      const resumeText = await parseResumeFile(file);
      if (resumeText.length < MIN_RESUME_TEXT_LENGTH) {
        throw new Error('В файле слишком мало текста для нормального анализа.');
      }

      set({
        resumeText,
        status: 'ready',
      });
      persistWorkspace(get());
    } catch (caught) {
      set({
        error: getErrorMessage(caught, 'Не удалось прочитать файл.'),
        resumeText: '',
        status: 'error',
      });
    }
  },

  restoreWorkspace() {
    const stored = loadResumeWorkspace();
    set({
      resumeText: stored.resumeText ?? '',
      advice: stored.advice ?? null,
      status: stored.advice ? 'done' : stored.resumeText ? 'ready' : 'idle',
      targetRole: stored.targetRole ?? '',
      translation: stored.translation ?? null,
      translationHistory: stored.translationHistory ?? [],
      translationLanguage: stored.translationLanguage ?? 'english',
      translationTone: stored.translationTone ?? 'atsFriendly',
      vacancyText: stored.vacancyText ?? '',
    });
  },

  selectTranslation(id) {
    const translation = get().translationHistory.find((item) => item.id === id) ?? null;
    set({ translation });
    persistWorkspace(get());
  },

  setResumeText(resumeText) {
    set({
      advice: null,
      resumeText,
      status: resumeText ? 'ready' : 'idle',
      translation: null,
    });
    persistWorkspace(get());
  },

  setTargetRole(targetRole) {
    set({ targetRole });
    persistWorkspace(get());
  },

  setTranslationText(text) {
    const { translation, translationHistory } = get();
    if (!translation) {
      return;
    }

    const updatedTranslation = {
      ...translation,
      text,
    };

    set({
      translation: updatedTranslation,
      translationHistory: translationHistory.map((item) =>
        item.id === updatedTranslation.id ? updatedTranslation : item,
      ),
    });
    persistWorkspace(get());
  },

  setTranslationLanguage(translationLanguage) {
    set({ translationLanguage });
    persistWorkspace(get());
  },

  setTranslationTone(translationTone) {
    set({ translationTone });
    persistWorkspace(get());
  },

  setVacancyText(vacancyText) {
    set({ vacancyText });
    persistWorkspace(get());
  },

  async translate() {
    const { advice, resumeText, translationLanguage, translationTone } = get();

    set({
      downloadProgress: null,
      error: '',
      status: 'translating',
      translation: null,
    });

    try {
      const translation = await translateResume(
        resumeText,
        translationLanguage,
        translationTone,
        (downloadProgress) => {
          set({ downloadProgress });
        },
      );

      const translationHistory = [
        translation,
        ...get().translationHistory.filter((item) => item.id !== translation.id),
      ].slice(0, 12);

      set({
        status: advice ? 'done' : 'ready',
        translation,
        translationHistory,
      });
      persistWorkspace(get());
    } catch (caught) {
      set({
        error: getErrorMessage(caught, 'Не удалось перевести резюме.'),
        status: 'error',
      });
    }
  },
}));

export function selectCanAnalyze({ modelStatus, resumeText, status }: ResumeStore) {
  return status === 'ready' && resumeText.length > 0 && canUseModel(modelStatus);
}

export function selectCanTranslate({ modelStatus, resumeText, status }: ResumeStore) {
  return (
    resumeText.length > 0 &&
    status !== 'parsing' &&
    status !== 'analyzing' &&
    status !== 'translating' &&
    canUseModel(modelStatus)
  );
}
