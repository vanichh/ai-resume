import { create } from 'zustand';

import { createAppSlice } from './slices/appSlice';
import { createComparisonSlice } from './slices/comparisonSlice';
import { createCoverLetterSlice } from './slices/coverLetterSlice';
import { createHistorySlice } from './slices/historySlice';
import { createResumeSlice } from './slices/resumeSlice';
import { createTranslationSlice } from './slices/translationSlice';
import type { ResumeStateType, ResumeStoreType } from './types';

const initialState: ResumeStateType = {
  advice: null,
  analysisHistory: [],
  comparisonVacancies: [],
  coverLetter: null,
  coverLetterCompanyType: 'product',
  coverLetterLength: 'standard',
  coverLetterStatus: 'idle',
  coverLetterTone: 'business',
  coverLetterVariantsCount: 1,
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

export const useResumeStore = create<ResumeStoreType>((...storeApi) => ({
  ...initialState,
  ...createAppSlice(...storeApi),
  ...createResumeSlice(...storeApi),
  ...createHistorySlice(...storeApi),
  ...createComparisonSlice(...storeApi),
  ...createTranslationSlice(...storeApi),
  ...createCoverLetterSlice(...storeApi),
}));
