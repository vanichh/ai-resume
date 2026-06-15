import type { ResumeStoreType } from '@store/types';

export const selectModelGuardRouteState = (state: ResumeStoreType) => ({
  modelStatus: state.modelStatus,
});
