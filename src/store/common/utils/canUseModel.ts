import type { ModelStatusType } from '@common/types';

export const canUseModel = (modelStatus: ModelStatusType): boolean => {
  return modelStatus !== 'checking' && modelStatus !== 'unsupported' && modelStatus !== 'unavailable';
};
