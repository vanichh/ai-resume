import type { ResumeStoreType } from '@store/types';

export const selectAnalysisHistoryState = (state: ResumeStoreType) => ({
  clearAnalysisHistory: state.clearAnalysisHistory,
  history: state.analysisHistory,
  removeAnalysisHistoryItem: state.removeAnalysisHistoryItem,
  selectAnalysisHistoryItem: state.selectAnalysisHistoryItem,
  setAnalysisHistoryNote: state.setAnalysisHistoryNote,
});
