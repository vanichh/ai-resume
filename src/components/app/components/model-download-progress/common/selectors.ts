import type { ResumeStoreType } from '@store/types';

export const selectModelDownloadProgress = (state: ResumeStoreType) => state.downloadProgress;
