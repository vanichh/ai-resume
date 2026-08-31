import type { ResumeSliceCreatorType } from './types';

import { persistWorkspace } from '../common/utils/persistWorkspace';
import type { HistoryActionsType } from '../types';

export const createHistorySlice: ResumeSliceCreatorType<HistoryActionsType> = (set, get) => ({
  clearAnalysisHistory() {
    set((state) => {
      const nextState = {
        ...state,
        activeAnalysisId: null,
        analysisHistory: [],
      };

      persistWorkspace(nextState);

      return {
        activeAnalysisId: nextState.activeAnalysisId,
        analysisHistory: nextState.analysisHistory,
      };
    });
  },

  removeAnalysisHistoryItem(id) {
    set((state) => {
      const nextState = {
        ...state,
        activeAnalysisId: state.activeAnalysisId === id ? null : state.activeAnalysisId,
        analysisHistory: state.analysisHistory.filter((item) => item.id !== id),
      };

      persistWorkspace(nextState);

      return {
        activeAnalysisId: nextState.activeAnalysisId,
        analysisHistory: nextState.analysisHistory,
      };
    });
  },

  selectAnalysisHistoryItem(id) {
    const state = get();
    const item = state.analysisHistory.find((historyItem) => historyItem.id === id);
    if (!item) {
      return;
    }

    set((state) => {
      const nextState = {
        ...state,
        activeAnalysisId: item.id,
        advice: item.advice,
        fileName: item.fileName,
        resumeText: item.resumeText,
        status: 'done' as const,
        targetRole: item.targetRole,
        translation: null,
        vacancyText: item.vacancyText,
      };

      persistWorkspace(nextState);

      return {
        activeAnalysisId: nextState.activeAnalysisId,
        advice: nextState.advice,
        fileName: nextState.fileName,
        resumeText: nextState.resumeText,
        status: nextState.status,
        targetRole: nextState.targetRole,
        translation: nextState.translation,
        vacancyText: nextState.vacancyText,
      };
    });
  },

  setAnalysisHistoryNote(id, note) {
    set((state) => {
      const nextState = {
        ...state,
        analysisHistory: state.analysisHistory.map((item) => (item.id === id ? { ...item, note } : item)),
      };

      persistWorkspace(nextState);

      return {
        analysisHistory: nextState.analysisHistory,
      };
    });
  },
});
