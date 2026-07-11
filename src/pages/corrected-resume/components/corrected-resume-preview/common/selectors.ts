import type { ResumeStoreType } from '@store/types';

export const selectCorrectedResumePreviewState = (state: ResumeStoreType) => ({
  correctedResumeStatus: state.correctedResumeStatus,
  correctedResumeText: state.correctedResumeText,
  generateCorrectedResume: state.generateCorrectedResume,
  hasAdvice: Boolean(state.advice),
  hasResume: Boolean(state.resumeText),
  setCorrectedResumeText: state.setCorrectedResumeText,
});
