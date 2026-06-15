import type { ResumeStoreType } from '@store/types';

export const selectResumeComparisonViewState = (state: ResumeStoreType) => ({
  resumeText: state.resumeText,
  translation: state.translation,
});
