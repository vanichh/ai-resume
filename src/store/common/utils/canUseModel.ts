import type { ModelStatus } from '@common/types';

export function canUseModel(modelStatus: ModelStatus): boolean {
  return modelStatus !== 'checking' && modelStatus !== 'unsupported' && modelStatus !== 'unavailable';
}
