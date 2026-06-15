import { generateCoverLetter as createCoverLetter } from '@services/cover-letter-generator';

import type { ResumeSliceCreatorType } from './types';

import { canUseModel } from '../common/utils/canUseModel';
import { getErrorMessage } from '../common/utils/getErrorMessage';
import { persistWorkspace } from '../common/utils/persistWorkspace';
import type { CoverLetterActionsType } from '../types';

export const createCoverLetterSlice: ResumeSliceCreatorType<CoverLetterActionsType> = (set, get) => ({
  async generateCoverLetter() {
    const state = get();
    const {
      advice,
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
          companyType: coverLetterCompanyType,
          length: coverLetterLength,
          tone: coverLetterTone,
          variantsCount: coverLetterVariantsCount,
        },
        (downloadProgress) => {
          set({ downloadProgress });
        },
      );

      set((state) => {
        const nextState = {
          ...state,
          coverLetter,
          coverLetterStatus: 'done' as const,
        };

        persistWorkspace(nextState);

        return {
          coverLetter: nextState.coverLetter,
          coverLetterStatus: nextState.coverLetterStatus,
          downloadProgress: null,
        };
      });
    } catch (caught) {
      set({
        coverLetterStatus: 'error',
        downloadProgress: null,
        error: getErrorMessage(caught, 'Не удалось сгенерировать сопроводительное письмо.'),
      });
    }
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
          title: 'Вариант 1',
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
      };

      persistWorkspace(nextState);

      return {
        coverLetter: nextState.coverLetter,
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
