import type { ResumeStoreType } from '@store/types';

export const selectResumePreviewState = (state: ResumeStoreType) => ({
  resumeText: state.resumeText,
  setResumeText: state.setResumeText,
});
