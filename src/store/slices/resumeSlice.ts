import { createId } from '@common/utils/createId';
import { analyzeResume } from '@services/resume-advisor';

import type { ResumeSliceCreatorType } from './types';

import { ANALYSIS_HISTORY_LIMIT, MIN_RESUME_TEXT_LENGTH } from '../common/constants';
import { getAnalysisTarget } from '../common/utils/getAnalysisTarget';
import { getErrorMessage } from '../common/utils/getErrorMessage';
import { persistWorkspace } from '../common/utils/persistWorkspace';
import { resetComparisonResults } from '../common/utils/resetComparisonResults';
import type { ResumeActionsType } from '../types';

export const createResumeSlice: ResumeSliceCreatorType<ResumeActionsType> = (set, get) => ({
  async analyze() {
    const state = get();
    const { fileName, resumeText, targetRole, vacancyText } = state;

    set({
      advice: null,
      coverLetter: null,
      coverLetterStatus: 'idle',
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
        note: '',
        resumeText,
        targetRole,
        vacancyText,
      };

      set((state) => {
        const nextState = {
          ...state,
          advice,
          analysisHistory: [
            historyItem,
            ...state.analysisHistory.filter(
              (item) =>
                item.resumeText !== resumeText || item.targetRole !== targetRole || item.vacancyText !== vacancyText,
            ),
          ].slice(0, ANALYSIS_HISTORY_LIMIT),
          status: 'done' as const,
        };

        persistWorkspace(nextState);

        return {
          advice: nextState.advice,
          analysisHistory: nextState.analysisHistory,
          downloadProgress: null,
          status: nextState.status,
        };
      });
    } catch (caught) {
      set({
        downloadProgress: null,
        error: getErrorMessage(caught, 'Не удалось получить рекомендации.'),
        status: 'error',
      });
    }
  },

  async parseFile(file) {
    set({
      advice: null,
      coverLetter: null,
      coverLetterStatus: 'idle',
      downloadProgress: null,
      error: '',
      fileName: file.name,
      status: 'parsing',
      translation: null,
    });

    try {
      const { parseResumeFile } = await import('@services/resume-parser');
      const resumeText = await parseResumeFile(file);
      if (resumeText.length < MIN_RESUME_TEXT_LENGTH) {
        throw new Error('В файле слишком мало текста для нормального анализа.');
      }

      set((currentState) => {
        const nextState = {
          ...currentState,
          resumeText,
          status: 'ready' as const,
          comparisonVacancies: resetComparisonResults(currentState),
        };

        persistWorkspace(nextState);

        return {
          resumeText: nextState.resumeText,
          status: nextState.status,
          comparisonVacancies: nextState.comparisonVacancies,
        };
      });
    } catch (caught) {
      set({
        error: getErrorMessage(caught, 'Не удалось прочитать файл.'),
        resumeText: '',
        status: 'error',
      });
    }
  },

  setResumeText(resumeText) {
    set((state) => {
      const nextState = {
        ...state,
        advice: null,
        comparisonVacancies: resetComparisonResults(state),
        coverLetter: null,
        coverLetterStatus: 'idle' as const,
        resumeText,
        status: resumeText ? ('ready' as const) : ('idle' as const),
        translation: null,
      };

      persistWorkspace(nextState);

      return {
        advice: nextState.advice,
        comparisonVacancies: nextState.comparisonVacancies,
        coverLetter: nextState.coverLetter,
        coverLetterStatus: nextState.coverLetterStatus,
        resumeText: nextState.resumeText,
        status: nextState.status,
        translation: nextState.translation,
      };
    });
  },

  setTargetRole(targetRole) {
    set((state) => {
      const nextState = {
        ...state,
        advice: null,
        coverLetter: null,
        coverLetterStatus: 'idle' as const,
        status: state.resumeText ? ('ready' as const) : ('idle' as const),
        targetRole,
      };

      persistWorkspace(nextState);

      return {
        advice: nextState.advice,
        coverLetter: nextState.coverLetter,
        coverLetterStatus: nextState.coverLetterStatus,
        status: nextState.status,
        targetRole: nextState.targetRole,
      };
    });
  },

  setVacancyText(vacancyText) {
    set((state) => {
      const nextState = {
        ...state,
        advice: null,
        coverLetter: null,
        coverLetterStatus: 'idle' as const,
        status: state.resumeText ? ('ready' as const) : ('idle' as const),
        vacancyText,
      };

      persistWorkspace(nextState);

      return {
        advice: nextState.advice,
        coverLetter: nextState.coverLetter,
        coverLetterStatus: nextState.coverLetterStatus,
        status: nextState.status,
        vacancyText: nextState.vacancyText,
      };
    });
  },
});
