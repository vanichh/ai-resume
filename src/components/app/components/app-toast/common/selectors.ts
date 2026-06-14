import type { ResumeStoreType } from '@store/types';

export const selectAppToastState = (state: ResumeStoreType) => ({
  clearError: state.clearError,
  clearSuccessMessage: state.clearSuccessMessage,
  error: state.error,
  successMessage: state.successMessage,
});
