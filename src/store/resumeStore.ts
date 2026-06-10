import { create } from 'zustand';

import { createId } from '@common/utils/createId';
import { loadResumeWorkspace } from '@common/utils/resumeWorkspaceStorage';

import { analyzeResume, getLanguageModelStatus } from '@services/resume-advisor';
import { parseResumeFile } from '@services/resume-parser';
import { translateResume } from '@services/resume-translator';

import {
  ANALYSIS_HISTORY_LIMIT,
  COMPARISON_VACANCY_LIMIT,
  MIN_RESUME_TEXT_LENGTH,
  MODEL_HINTS,
} from './common/constants';
import { canUseModel } from './common/utils/canUseModel';
import { getAnalysisTarget } from './common/utils/getAnalysisTarget';
import { getErrorMessage } from './common/utils/getErrorMessage';
import { persistWorkspace } from './common/utils/persistWorkspace';
import { resetComparisonResults } from './common/utils/resetComparisonResults';

import type { ResumeState, ResumeStore } from './types';

const initialState: ResumeState = {
  advice: null,
  analysisHistory: [],
  comparisonVacancies: [],
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

export const useResumeStore = create<ResumeStore>((set, get) => ({
  ...initialState,

  addComparisonVacancy() {
    const { comparisonVacancies } = get();
    if (comparisonVacancies.length >= COMPARISON_VACANCY_LIMIT) {
      return;
    }

    set({
      comparisonVacancies: [
        ...comparisonVacancies,
        {
          id: createId(),
          advice: null,
          error: '',
          status: 'idle',
          title: `Вакансия ${comparisonVacancies.length + 1}`,
          vacancyText: '',
        },
      ],
    });
    persistWorkspace(get());
  },

  async analyze() {
    const { fileName, resumeText, targetRole, vacancyText } = get();

    set({
      advice: null,
      downloadProgress: null,
      error: '',
      status: 'analyzing',
    });

    try {
      const advice = await analyzeResume(resumeText, getAnalysisTarget(targetRole, vacancyText), (downloadProgress) => {
        set({ downloadProgress });
      });
      const historyItem = {
        id: createId(),
        advice,
        createdAt: new Date().toISOString(),
        fileName,
        resumeText,
        targetRole,
        vacancyText,
      };

      set({
        advice,
        analysisHistory: [
          historyItem,
          ...get().analysisHistory.filter(
            (item) =>
              item.resumeText !== resumeText || item.targetRole !== targetRole || item.vacancyText !== vacancyText,
          ),
        ].slice(0, ANALYSIS_HISTORY_LIMIT),
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

  async analyzeComparison() {
    const { comparisonVacancies, modelStatus, resumeText, targetRole } = get();
    if (!resumeText || !canUseModel(modelStatus)) {
      return;
    }

    const vacanciesToAnalyze = comparisonVacancies.filter((vacancy) => vacancy.vacancyText.trim());
    if (vacanciesToAnalyze.length === 0) {
      return;
    }

    set({
      error: '',
      comparisonVacancies: comparisonVacancies.map((vacancy) =>
        vacancy.vacancyText.trim()
          ? {
              ...vacancy,
              advice: null,
              error: '',
              status: 'analyzing',
            }
          : vacancy,
      ),
    });

    for (const vacancy of vacanciesToAnalyze) {
      try {
        const advice = await analyzeResume(
          resumeText,
          getAnalysisTarget(targetRole || vacancy.title, vacancy.vacancyText),
        );
        set({
          comparisonVacancies: get().comparisonVacancies.map((item) =>
            item.id === vacancy.id
              ? {
                  ...item,
                  advice,
                  error: '',
                  status: 'done',
                }
              : item,
          ),
        });
      } catch (caught) {
        set({
          comparisonVacancies: get().comparisonVacancies.map((item) =>
            item.id === vacancy.id
              ? {
                  ...item,
                  advice: null,
                  error: getErrorMessage(caught, 'Не удалось сравнить с вакансией.'),
                  status: 'error',
                }
              : item,
          ),
        });
      }
      persistWorkspace(get());
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

  clearAnalysisHistory() {
    set({ analysisHistory: [] });
    persistWorkspace(get());
  },

  removeAnalysisHistoryItem(id) {
    set({
      analysisHistory: get().analysisHistory.filter((item) => item.id !== id),
    });
    persistWorkspace(get());
  },

  removeComparisonVacancy(id) {
    set({
      comparisonVacancies: get().comparisonVacancies.filter((vacancy) => vacancy.id !== id),
    });
    persistWorkspace(get());
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
        comparisonVacancies: resetComparisonResults(get()),
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
      analysisHistory: stored.analysisHistory ?? [],
      resumeText: stored.resumeText ?? '',
      advice: stored.advice ?? null,
      comparisonVacancies: stored.comparisonVacancies ?? [],
      status: stored.advice ? 'done' : stored.resumeText ? 'ready' : 'idle',
      targetRole: stored.targetRole ?? '',
      translation: stored.translation ?? null,
      translationHistory: stored.translationHistory ?? [],
      translationLanguage: stored.translationLanguage ?? 'english',
      translationTone: stored.translationTone ?? 'atsFriendly',
      vacancyText: stored.vacancyText ?? '',
    });
  },

  selectAnalysisHistoryItem(id) {
    const item = get().analysisHistory.find((historyItem) => historyItem.id === id);
    if (!item) {
      return;
    }

    set({
      advice: item.advice,
      fileName: item.fileName,
      resumeText: item.resumeText,
      status: 'done',
      targetRole: item.targetRole,
      translation: null,
      vacancyText: item.vacancyText,
    });
    persistWorkspace(get());
  },

  selectComparisonVacancy(id) {
    const vacancy = get().comparisonVacancies.find((item) => item.id === id);
    if (!vacancy?.advice) {
      return;
    }

    set({
      advice: vacancy.advice,
      status: 'done',
      vacancyText: vacancy.vacancyText,
    });
    persistWorkspace(get());
  },

  selectTranslation(id) {
    const translation = get().translationHistory.find((item) => item.id === id) ?? null;
    set({ translation });
    persistWorkspace(get());
  },

  setResumeText(resumeText) {
    set({
      advice: null,
      comparisonVacancies: resetComparisonResults(get()),
      resumeText,
      status: resumeText ? 'ready' : 'idle',
      translation: null,
    });
    persistWorkspace(get());
  },

  setComparisonVacancyText(id, vacancyText) {
    set({
      comparisonVacancies: get().comparisonVacancies.map((vacancy) =>
        vacancy.id === id
          ? {
              ...vacancy,
              advice: null,
              error: '',
              status: 'idle',
              vacancyText,
            }
          : vacancy,
      ),
    });
    persistWorkspace(get());
  },

  setComparisonVacancyTitle(id, title) {
    set({
      comparisonVacancies: get().comparisonVacancies.map((vacancy) =>
        vacancy.id === id
          ? {
              ...vacancy,
              title,
            }
          : vacancy,
      ),
    });
    persistWorkspace(get());
  },

  setTargetRole(targetRole) {
    set({
      advice: null,
      status: get().resumeText ? 'ready' : 'idle',
      targetRole,
    });
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
    set({
      advice: null,
      status: get().resumeText ? 'ready' : 'idle',
      vacancyText,
    });
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
