import type { CoverLetterType } from '@common/types';

export type CoverLetterHistoryItemProps = {
  isActive: boolean;
  item: CoverLetterType;
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
};
