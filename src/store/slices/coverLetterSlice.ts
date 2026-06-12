import { generateCoverLetter as createCoverLetter } from '@services/cover-letter-generator';

import type { ResumeSliceCreatorType } from './types';

import { canUseModel } from '../common/utils/canUseModel';
import { getErrorMessage } from '../common/utils/getErrorMessage';
import { persistWorkspace } from '../common/utils/persistWorkspace';
import type { CoverLetterActionsType } from '../types';

export const createCoverLetterSlice: ResumeSliceCreatorType<CoverLetterActionsType> = (set, get) => ({
  async generateCoverLetter() {
    const { advice, modelStatus, resumeText, targetRole, vacancyText } = get();
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

      set({
        coverLetter,
        coverLetterStatus: 'done',
      });
      persistWorkspace(get());
    } catch (caught) {
      set({
        coverLetterStatus: 'error',
        error: getErrorMessage(caught, 'Не удалось сгенерировать сопроводительное письмо.'),
      });
    }
  },

  setCoverLetterText(text) {
    const { coverLetter } = get();
    if (!coverLetter) {
      return;
    }

    set({
      coverLetter: {
        ...coverLetter,
        text,
      },
    });
    persistWorkspace(get());
  },
});
