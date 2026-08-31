import { i18n } from '@i18n/index';

import { generateCorrectedResume } from '@services/corrected-resume-generator';

import type { ResumeSliceCreatorType } from './types';

import { canUseModel } from '../common/utils/canUseModel';
import { getErrorMessage } from '../common/utils/getErrorMessage';
import type { CorrectedResumeActionsType } from '../types';

export const createCorrectedResumeSlice: ResumeSliceCreatorType<CorrectedResumeActionsType> = (set, get) => ({
  async generateCorrectedResume() {
    const { advice, modelStatus, resumeText, targetRole, vacancyText } = get();
    if (!advice || !resumeText || !canUseModel(modelStatus)) {
      return;
    }

    set({ correctedResumeStatus: 'generating', correctedResumeText: '', downloadProgress: null, error: '' });

    try {
      const correctedResumeText = await generateCorrectedResume(
        resumeText,
        advice,
        targetRole,
        vacancyText,
        (downloadProgress) => set({ downloadProgress }),
        get().markLanguageModelReady,
      );
      set({ correctedResumeStatus: 'done', correctedResumeText, downloadProgress: null });
    } catch (caught) {
      set({
        correctedResumeStatus: 'error',
        downloadProgress: null,
        error: getErrorMessage(caught, i18n.t('workspace.errors.correctedResume')),
      });
    }
  },

  setCorrectedResumeText(correctedResumeText) {
    set({ correctedResumeText });
  },
});
