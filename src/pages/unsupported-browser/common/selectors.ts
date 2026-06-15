import type { ResumeStoreType } from '@store/types';

export const selectUnsupportedBrowserPageState = (state: ResumeStoreType) => ({
  checkModelStatus: state.checkModelStatus,
  modelStatus: state.modelStatus,
});
