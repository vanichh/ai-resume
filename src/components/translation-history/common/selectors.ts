import type { ResumeStoreType } from '@store/types';

export const selectTranslationHistoryState = (state: ResumeStoreType) => ({
  activeId: state.translation?.id,
  history: state.translationHistory,
  selectTranslation: state.selectTranslation,
});
