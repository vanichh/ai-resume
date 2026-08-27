import type { ResumeStoreType } from '@store/types';

export const selectModelDownloadProgress = ({ downloadProgress, modelStatus }: ResumeStoreType) => {
  return modelStatus === 'available' ? null : downloadProgress;
};
