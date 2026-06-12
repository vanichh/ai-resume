import type { ModelStatusType } from '@common/types';

export function canUseModel(modelStatus: ModelStatusType): boolean {
  return modelStatus !== 'checking' && modelStatus !== 'unsupported' && modelStatus !== 'unavailable';
}
