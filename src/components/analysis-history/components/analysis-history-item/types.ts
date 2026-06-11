import type { ResumeAnalysisHistoryItem } from '@common/types';

export type AnalysisHistoryItemProps = {
  item: ResumeAnalysisHistoryItem;
  onNoteChange: (id: string, value: string) => void;
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
};
