import type { ResumeAnalysisHistoryItemType } from '@common/types';

export type AnalysisHistoryItemProps = {
  item: ResumeAnalysisHistoryItemType;
  onNoteChange: (id: string, value: string) => void;
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
};
