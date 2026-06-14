import type { ResumeStoreType } from '@store/types';

export const selectResumeTranslationPreviewState = (state: ResumeStoreType) => ({
  setTranslationText: state.setTranslationText,
  translation: state.translation,
});
