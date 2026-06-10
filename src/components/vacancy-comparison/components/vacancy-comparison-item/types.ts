import type { VacancyComparisonItem as VacancyComparisonItemModel } from '@common/types';

export type VacancyComparisonItemProps = {
  item: VacancyComparisonItemModel;
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
  onTextChange: (id: string, value: string) => void;
  onTitleChange: (id: string, value: string) => void;
};
