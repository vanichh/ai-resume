import type { ResumeStoreType } from '@store/types';

export const selectTranslationPageState = (state: ResumeStoreType) => ({
  translation: state.translation,
});
