import type { VacancyComparisonStatus } from '@common/types';

export const VACANCY_COMPARISON_STATUS_LABELS: Record<VacancyComparisonStatus, string> = {
  analyzing: 'Анализируется',
  done: 'Готово',
  error: 'Ошибка',
  idle: 'Ожидает анализа',
};
