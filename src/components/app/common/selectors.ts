import type { ResumeStoreType } from '@store/types';

export const selectAppBootstrapState = (state: ResumeStoreType) => ({
  checkModelStatus: state.checkModelStatus,
  restoreWorkspace: state.restoreWorkspace,
});
