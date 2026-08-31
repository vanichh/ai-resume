import { i18n } from '@i18n/index';

import { createId } from '@common/utils/createId';
import { analyzeResume } from '@services/resume-advisor';

import type { ResumeSliceCreatorType } from './types';

import { ANALYSIS_HISTORY_LIMIT, MIN_RESUME_TEXT_LENGTH } from '../common/constants';
import { getAnalysisTarget } from '../common/utils/getAnalysisTarget';
import { getErrorMessage } from '../common/utils/getErrorMessage';
import { persistWorkspace } from '../common/utils/persistWorkspace';
import { resetComparisonResults } from '../common/utils/resetComparisonResults';
import type { ResumeActionsType } from '../types';

let analysisAbortController: AbortController | null = null;

export const createResumeSlice: ResumeSliceCreatorType<ResumeActionsType> = (set, get) => ({
  async analyze() {
    const state = get();
    const { fileName, resumeText, targetRole, vacancyText } = state;

    analysisAbortController?.abort();
    const abortController = new AbortController();
    analysisAbortController = abortController;

    set({
      activeAnalysisId: null,
      advice: null,
      analysisStage: 'preparing',
      coverLetter: null,
      coverLetterStatus: 'idle',
      correctedResumeStatus: 'idle',
      correctedResumeText: '',
      downloadProgress: null,
      error: '',
      status: 'analyzing',
    });

    try {
      const advice = await analyzeResume(
        resumeText,
        getAnalysisTarget(targetRole, vacancyText),
        (downloadProgress) => {
          if (analysisAbortController === abortController) {
            set({ downloadProgress });
          }
        },
        abortController.signal,
        (analysisStage) => {
          if (analysisAbortController === abortController) {
            set({ analysisStage });
          }
        },
        get().markLanguageModelReady,
      );

      if (abortController.signal.aborted || analysisAbortController !== abortController) {
        return;
      }
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
          activeAnalysisId: historyItem.id,
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
          activeAnalysisId: nextState.activeAnalysisId,
          advice: nextState.advice,
          analysisStage: null,
          analysisHistory: nextState.analysisHistory,
          downloadProgress: null,
          status: nextState.status,
        };
      });
    } catch (caught) {
      if (abortController.signal.aborted) {
        return;
      }

      set({
        analysisStage: null,
        downloadProgress: null,
        error: getErrorMessage(caught, i18n.t('workspace.errors.analysis')),
        status: 'error',
      });
    } finally {
      if (analysisAbortController === abortController) {
        analysisAbortController = null;
      }
    }
  },

  cancelAnalysis() {
    if (!analysisAbortController) {
      return;
    }

    analysisAbortController.abort();
    analysisAbortController = null;
    set((state) => ({
      analysisStage: null,
      downloadProgress: null,
      error: '',
      status: state.resumeText ? ('ready' as const) : ('idle' as const),
    }));
  },

  async parseFile(file) {
    set({
      activeAnalysisId: null,
      advice: null,
      coverLetter: null,
      coverLetterStatus: 'idle',
      downloadProgress: null,
      error: '',
      fileName: file.name,
      status: 'parsing',
      translation: null,
      correctedResumeStatus: 'idle',
      correctedResumeText: '',
    });

    try {
      const { parseResumeFile } = await import('@services/resume-parser');
      const resumeText = await parseResumeFile(file);
      if (resumeText.length < MIN_RESUME_TEXT_LENGTH) {
        throw new Error(i18n.t('workspace.errors.fileTooShort'));
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
        error: getErrorMessage(caught, i18n.t('workspace.errors.fileRead')),
        resumeText: '',
        status: 'error',
      });
    }
  },

  setResumeText(resumeText) {
    set((state) => {
      const nextState = {
        ...state,
        activeAnalysisId: null,
        advice: null,
        comparisonVacancies: resetComparisonResults(state),
        coverLetter: null,
        coverLetterStatus: 'idle' as const,
        correctedResumeStatus: 'idle' as const,
        correctedResumeText: '',
        resumeText,
        status: resumeText ? ('ready' as const) : ('idle' as const),
        translation: null,
      };

      persistWorkspace(nextState);

      return {
        activeAnalysisId: nextState.activeAnalysisId,
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
        activeAnalysisId: null,
        advice: null,
        coverLetter: null,
        coverLetterStatus: 'idle' as const,
        status: state.resumeText ? ('ready' as const) : ('idle' as const),
        targetRole,
      };

      persistWorkspace(nextState);

      return {
        activeAnalysisId: nextState.activeAnalysisId,
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
        activeAnalysisId: null,
        advice: null,
        coverLetter: null,
        coverLetterStatus: 'idle' as const,
        status: state.resumeText ? ('ready' as const) : ('idle' as const),
        vacancyText,
      };

      persistWorkspace(nextState);

      return {
        activeAnalysisId: nextState.activeAnalysisId,
        advice: nextState.advice,
        coverLetter: nextState.coverLetter,
        coverLetterStatus: nextState.coverLetterStatus,
        status: nextState.status,
        vacancyText: nextState.vacancyText,
      };
    });
  },
});
