import type { ResumeStoreType } from '../../types';

export function resetComparisonResults(state: ResumeStoreType) {
  return state.comparisonVacancies.map((vacancy) => ({
    ...vacancy,
    advice: null,
    error: '',
    status: 'idle' as const,
  }));
}
