import type { VacancyComparisonStatusType } from '@common/types';

export const VACANCY_COMPARISON_STATUS_LABELS: Record<VacancyComparisonStatusType, string> = {
  analyzing: 'Анализируется',
  done: 'Готово',
  error: 'Ошибка',
  idle: 'Ожидает анализа',
};
