import type { ResumeStore } from '../../types';

export function resetComparisonResults(state: ResumeStore) {
  return state.comparisonVacancies.map((vacancy) => ({
    ...vacancy,
    advice: null,
    error: '',
    status: 'idle' as const,
  }));
}
