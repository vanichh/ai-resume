import { generateCoverLetter as createCoverLetter } from '@services/cover-letter-generator';

import type { ResumeSliceCreatorType } from './types';

import { canUseModel } from '../common/utils/canUseModel';
import { getErrorMessage } from '../common/utils/getErrorMessage';
import { persistWorkspace } from '../common/utils/persistWorkspace';
import type { CoverLetterActionsType } from '../types';

export const createCoverLetterSlice: ResumeSliceCreatorType<CoverLetterActionsType> = (set, get) => ({
  async generateCoverLetter() {
    const state = get();
    const { advice, modelStatus, resumeText, targetRole, vacancyText } = state;
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
      const coverLetter = await createCoverLetter(resumeText, advice, targetRole, vacancyText, (downloadProgress) => {
        set({ downloadProgress });
      });

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

  setCoverLetterText(text) {
    set((state) => {
      if (!state.coverLetter) {
        return state;
      }

      const nextState = {
        ...state,
        coverLetter: {
          ...state.coverLetter,
          text,
        },
      };

      persistWorkspace(nextState);

      return {
        coverLetter: nextState.coverLetter,
      };
    });
  },
});
