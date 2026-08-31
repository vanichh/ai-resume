import { i18n } from '@i18n/index';

import { generateCoverLetter as createCoverLetter } from '@services/cover-letter-generator';

import type { ResumeSliceCreatorType } from './types';

import { COVER_LETTER_HISTORY_LIMIT } from '../common/constants';
import { canUseModel } from '../common/utils/canUseModel';
import { getErrorMessage } from '../common/utils/getErrorMessage';
import { persistWorkspace } from '../common/utils/persistWorkspace';
import type { CoverLetterActionsType } from '../types';

export const createCoverLetterSlice: ResumeSliceCreatorType<CoverLetterActionsType> = (set, get) => ({
  async generateCoverLetter() {
    const state = get();
    const {
      advice,
      activeAnalysisId,
      coverLetterCompanyName,
      coverLetterCompanyType,
      coverLetterLength,
      coverLetterTone,
      coverLetterVariantsCount,
      modelStatus,
      resumeText,
      targetRole,
      vacancyText,
    } = state;
    if (!resumeText || !canUseModel(modelStatus)) {
      return;
    }

    set({
      coverLetter: null,
      coverLetterStatus: 'generating',
      downloadProgress: null,
      error: '',
    });

    try {
      const coverLetter = await createCoverLetter(
        resumeText,
        advice,
        targetRole,
        vacancyText,
        {
          companyName: coverLetterCompanyName,
          companyType: coverLetterCompanyType,
          length: coverLetterLength,
          sourceAnalysisId: activeAnalysisId,
          tone: coverLetterTone,
          variantsCount: coverLetterVariantsCount,
        },
        (downloadProgress) => {
          set({ downloadProgress });
        },
        get().markLanguageModelReady,
      );

      set((state) => {
        const nextState = {
          ...state,
          coverLetter,
          coverLetterHistory: [
            coverLetter,
            ...state.coverLetterHistory.filter((item) => item.id !== coverLetter.id),
          ].slice(0, COVER_LETTER_HISTORY_LIMIT),
          coverLetterStatus: 'done' as const,
        };

        persistWorkspace(nextState);

        return {
          coverLetter: nextState.coverLetter,
          coverLetterHistory: nextState.coverLetterHistory,
          coverLetterStatus: nextState.coverLetterStatus,
          downloadProgress: null,
        };
      });
    } catch (caught) {
      set({
        coverLetterStatus: 'error',
        downloadProgress: null,
        error: getErrorMessage(caught, i18n.t('workspace.errors.coverLetter')),
      });
    }
  },

  removeCoverLetter(id) {
    set((state) => {
      const isActiveCoverLetter = state.coverLetter?.id === id;
      const nextState = {
        ...state,
        coverLetter: isActiveCoverLetter ? null : state.coverLetter,
        coverLetterHistory: state.coverLetterHistory.filter((item) => item.id !== id),
        coverLetterStatus: isActiveCoverLetter ? ('idle' as const) : state.coverLetterStatus,
      };

      persistWorkspace(nextState);

      return {
        coverLetter: nextState.coverLetter,
        coverLetterHistory: nextState.coverLetterHistory,
        coverLetterStatus: nextState.coverLetterStatus,
      };
    });
  },

  selectCoverLetter(id) {
    const currentState = get();
    const coverLetter = currentState.coverLetterHistory.find((item) => item.id === id);
    if (!coverLetter) {
      return;
    }
    const sourceAnalysis = currentState.analysisHistory.find((item) => item.id === coverLetter.sourceAnalysisId);

    set((state) => {
      const nextState = {
        ...state,
        activeAnalysisId: sourceAnalysis?.id ?? null,
        advice: sourceAnalysis?.advice ?? null,
        coverLetter,
        coverLetterCompanyName: coverLetter.companyName,
        coverLetterCompanyType: coverLetter.companyType,
        coverLetterLength: coverLetter.length,
        coverLetterStatus: 'done' as const,
        coverLetterTone: coverLetter.tone,
        fileName: sourceAnalysis?.fileName ?? state.fileName,
        resumeText: sourceAnalysis?.resumeText ?? state.resumeText,
        status: sourceAnalysis ? ('done' as const) : state.resumeText ? ('ready' as const) : ('idle' as const),
        targetRole: coverLetter.targetRole,
        vacancyText: coverLetter.vacancyText,
      };

      persistWorkspace(nextState);

      return {
        activeAnalysisId: nextState.activeAnalysisId,
        advice: nextState.advice,
        coverLetter: nextState.coverLetter,
        coverLetterCompanyName: nextState.coverLetterCompanyName,
        coverLetterCompanyType: nextState.coverLetterCompanyType,
        coverLetterLength: nextState.coverLetterLength,
        coverLetterStatus: nextState.coverLetterStatus,
        coverLetterTone: nextState.coverLetterTone,
        fileName: nextState.fileName,
        resumeText: nextState.resumeText,
        status: nextState.status,
        targetRole: nextState.targetRole,
        vacancyText: nextState.vacancyText,
      };
    });
  },

  setCoverLetterCompanyName(coverLetterCompanyName) {
    set((state) => {
      const nextState = {
        ...state,
        coverLetterCompanyName,
      };

      persistWorkspace(nextState);

      return {
        coverLetterCompanyName: nextState.coverLetterCompanyName,
      };
    });
  },

  setCoverLetterCompanyType(coverLetterCompanyType) {
    set((state) => {
      const nextState = {
        ...state,
        coverLetterCompanyType,
      };

      persistWorkspace(nextState);

      return {
        coverLetterCompanyType: nextState.coverLetterCompanyType,
      };
    });
  },

  setCoverLetterLength(coverLetterLength) {
    set((state) => {
      const nextState = {
        ...state,
        coverLetterLength,
      };

      persistWorkspace(nextState);

      return {
        coverLetterLength: nextState.coverLetterLength,
      };
    });
  },

  setCoverLetterText(text) {
    set((state) => {
      if (!state.coverLetter) {
        return state;
      }

      const variants = state.coverLetter.variants ?? [
        {
          id: state.coverLetter.id,
          text: state.coverLetter.text,
          title: i18n.t('workspace.coverLetter.variantTitle', { count: 1 }),
        },
      ];
      const nextState = {
        ...state,
        coverLetter: {
          ...state.coverLetter,
          text,
          variants: variants.map((variant, index) =>
            index === 0
              ? {
                  ...variant,
                  text,
                }
              : variant,
          ),
        },
        coverLetterHistory: state.coverLetterHistory.map((item) =>
          item.id === state.coverLetter?.id
            ? {
                ...item,
                text,
                variants: variants.map((variant, index) =>
                  index === 0
                    ? {
                        ...variant,
                        text,
                      }
                    : variant,
                ),
              }
            : item,
        ),
      };

      persistWorkspace(nextState);

      return {
        coverLetter: nextState.coverLetter,
        coverLetterHistory: nextState.coverLetterHistory,
      };
    });
  },

  setCoverLetterTone(coverLetterTone) {
    set((state) => {
      const nextState = {
        ...state,
        coverLetterTone,
      };

      persistWorkspace(nextState);

      return {
        coverLetterTone: nextState.coverLetterTone,
      };
    });
  },

  setCoverLetterVariantsCount(coverLetterVariantsCount) {
    set((state) => {
      const nextState = {
        ...state,
        coverLetterVariantsCount,
      };

      persistWorkspace(nextState);

      return {
        coverLetterVariantsCount: nextState.coverLetterVariantsCount,
      };
    });
  },
});
