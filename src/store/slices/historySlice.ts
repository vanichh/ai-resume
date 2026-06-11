import type { ResumeSliceCreator } from './types';

import { persistWorkspace } from '../common/utils/persistWorkspace';
import type { HistoryActions } from '../types';

export const createHistorySlice: ResumeSliceCreator<HistoryActions> = (set, get) => ({
  clearAnalysisHistory() {
    set({ analysisHistory: [] });
    persistWorkspace(get());
  },

  removeAnalysisHistoryItem(id) {
    set({
      analysisHistory: get().analysisHistory.filter((item) => item.id !== id),
    });
    persistWorkspace(get());
  },

  selectAnalysisHistoryItem(id) {
    const item = get().analysisHistory.find((historyItem) => historyItem.id === id);
    if (!item) {
      return;
    }

    set({
      advice: item.advice,
      fileName: item.fileName,
      resumeText: item.resumeText,
      status: 'done',
      targetRole: item.targetRole,
      translation: null,
      vacancyText: item.vacancyText,
    });
    persistWorkspace(get());
  },

  setAnalysisHistoryNote(id, note) {
    set({
      analysisHistory: get().analysisHistory.map((item) => (item.id === id ? { ...item, note } : item)),
    });
    persistWorkspace(get());
  },
});
