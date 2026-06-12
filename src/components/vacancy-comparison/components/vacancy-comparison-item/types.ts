import type { VacancyComparisonItemType as VacancyComparisonItemModelType } from '@common/types';

export type VacancyComparisonItemProps = {
  item: VacancyComparisonItemModelType;
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
  onTextChange: (id: string, value: string) => void;
  onTitleChange: (id: string, value: string) => void;
};
