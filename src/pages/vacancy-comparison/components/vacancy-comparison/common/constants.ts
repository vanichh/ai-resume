import type { VacancyComparisonStatusType } from '@common/types';

export const VACANCY_COMPARISON_STATUS_LABELS = {
  analyzing: 'workspace.comparison.statuses.analyzing',
  done: 'workspace.comparison.statuses.done',
  error: 'workspace.comparison.statuses.error',
  idle: 'workspace.comparison.statuses.idle',
} as const satisfies Record<VacancyComparisonStatusType, string>;
