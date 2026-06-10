import type { ResumeAnalysisHistoryItem } from '@common/types';

export type AnalysisHistoryItemProps = {
  item: ResumeAnalysisHistoryItem;
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
};
