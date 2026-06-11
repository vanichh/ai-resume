import { create } from 'zustand';

import { createAppSlice } from './slices/appSlice';
import { createComparisonSlice } from './slices/comparisonSlice';
import { createCoverLetterSlice } from './slices/coverLetterSlice';
import { createHistorySlice } from './slices/historySlice';
import { createResumeSlice } from './slices/resumeSlice';
import { createTranslationSlice } from './slices/translationSlice';
import type { ResumeState, ResumeStore } from './types';

const initialState: ResumeState = {
  advice: null,
  analysisHistory: [],
  comparisonVacancies: [],
  coverLetter: null,
  coverLetterStatus: 'idle',
  downloadProgress: null,
  error: '',
  fileName: '',
  modelHint: '',
  modelStatus: 'checking',
  resumeText: '',
  status: 'idle',
  successMessage: '',
  targetRole: '',
  translation: null,
  translationHistory: [],
  translationLanguage: 'english',
  translationTone: 'atsFriendly',
  vacancyText: '',
};

export const useResumeStore = create<ResumeStore>((...storeApi) => ({
  ...initialState,
  ...createAppSlice(...storeApi),
  ...createResumeSlice(...storeApi),
  ...createHistorySlice(...storeApi),
  ...createComparisonSlice(...storeApi),
  ...createTranslationSlice(...storeApi),
  ...createCoverLetterSlice(...storeApi),
}));
