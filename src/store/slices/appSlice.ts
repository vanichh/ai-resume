import { clearResumeWorkspace, loadResumeWorkspace } from '@common/utils/resumeWorkspaceStorage';

import { getLanguageModelStatus } from '@services/resume-advisor';

import type { ResumeSliceCreatorType } from './types';

import { MODEL_HINTS } from '../common/constants';
import type { AppActionsType, ResumeStateType } from '../types';

const clearedWorkspaceState: Omit<ResumeStateType, 'modelHint' | 'modelStatus'> = {
  advice: null,
  analysisHistory: [],
  comparisonVacancies: [],
  coverLetter: null,
  coverLetterStatus: 'idle' as const,
  downloadProgress: null,
  error: '',
  fileName: '',
  resumeText: '',
  status: 'idle' as const,
  successMessage: 'Локальные данные очищены.',
  targetRole: '',
  translation: null,
  translationHistory: [],
  translationLanguage: 'english' as const,
  translationTone: 'atsFriendly' as const,
  vacancyText: '',
};

export const createAppSlice: ResumeSliceCreatorType<AppActionsType> = (set) => ({
  async checkModelStatus() {
    try {
      const modelStatus = await getLanguageModelStatus();

      set({
        modelHint: MODEL_HINTS[modelStatus] ?? '',
        modelStatus,
      });
    } catch {
      set({
        modelHint: MODEL_HINTS.unavailable,
        modelStatus: 'unavailable',
      });
    }
  },

  clearError() {
    set({
      error: '',
      successMessage: '',
    });
  },

  clearSuccessMessage() {
    set({ successMessage: '' });
  },

  clearWorkspace() {
    clearResumeWorkspace();
    set(clearedWorkspaceState);
  },

  restoreWorkspace() {
    const stored = loadResumeWorkspace();
    set({
      analysisHistory: stored.analysisHistory?.map((item) => ({ ...item, note: item.note ?? '' })) ?? [],
      resumeText: stored.resumeText ?? '',
      advice: stored.advice ?? null,
      comparisonVacancies: stored.comparisonVacancies ?? [],
      coverLetter: stored.coverLetter ?? null,
      coverLetterStatus: stored.coverLetter ? 'done' : 'idle',
      status: stored.advice ? 'done' : stored.resumeText ? 'ready' : 'idle',
      targetRole: stored.targetRole ?? '',
      translation: stored.translation ?? null,
      translationHistory: stored.translationHistory ?? [],
      translationLanguage: stored.translationLanguage ?? 'english',
      translationTone: stored.translationTone ?? 'atsFriendly',
      vacancyText: stored.vacancyText ?? '',
    });
  },

  showSuccessMessage(message) {
    set({
      error: '',
      successMessage: message,
    });
  },
});
