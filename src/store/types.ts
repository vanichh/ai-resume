import type {
  AppStatus,
  CoverLetter,
  CoverLetterStatus,
  ModelStatus,
  ResumeAdvice,
  ResumeAnalysisHistoryItem,
  ResumeTranslation,
  ResumeTranslationLanguage,
  ResumeTranslationTone,
  VacancyComparisonItem,
} from '@common/types';

export type ResumeState = {
  advice: ResumeAdvice | null;
  analysisHistory: ResumeAnalysisHistoryItem[];
  comparisonVacancies: VacancyComparisonItem[];
  coverLetter: CoverLetter | null;
  coverLetterStatus: CoverLetterStatus;
  downloadProgress: number | null;
  error: string;
  fileName: string;
  modelHint: string;
  modelStatus: ModelStatus;
  resumeText: string;
  status: AppStatus;
  successMessage: string;
  targetRole: string;
  translation: ResumeTranslation | null;
  translationHistory: ResumeTranslation[];
  translationLanguage: ResumeTranslationLanguage;
  translationTone: ResumeTranslationTone;
  vacancyText: string;
};

export type AppActions = {
  checkModelStatus: () => Promise<void>;
  clearError: () => void;
  clearSuccessMessage: () => void;
  clearWorkspace: () => void;
  restoreWorkspace: () => void;
  showSuccessMessage: (message: string) => void;
};

export type ResumeActions = {
  analyze: () => Promise<void>;
  parseFile: (file: File) => Promise<void>;
  setResumeText: (value: string) => void;
  setTargetRole: (value: string) => void;
  setVacancyText: (value: string) => void;
};

export type HistoryActions = {
  clearAnalysisHistory: () => void;
  removeAnalysisHistoryItem: (id: string) => void;
  selectAnalysisHistoryItem: (id: string) => void;
  setAnalysisHistoryNote: (id: string, value: string) => void;
};

export type ComparisonActions = {
  addComparisonVacancy: () => void;
  analyzeComparison: () => Promise<void>;
  removeComparisonVacancy: (id: string) => void;
  selectComparisonVacancy: (id: string) => void;
  setComparisonVacancyText: (id: string, value: string) => void;
  setComparisonVacancyTitle: (id: string, value: string) => void;
};

export type CoverLetterActions = {
  generateCoverLetter: () => Promise<void>;
  setCoverLetterText: (value: string) => void;
};

export type TranslationActions = {
  selectTranslation: (id: string) => void;
  setTranslationText: (value: string) => void;
  setTranslationLanguage: (value: ResumeTranslationLanguage) => void;
  setTranslationTone: (value: ResumeTranslationTone) => void;
  translate: () => Promise<void>;
};

export type ResumeStore = ResumeState &
  AppActions &
  ResumeActions &
  HistoryActions &
  ComparisonActions &
  CoverLetterActions &
  TranslationActions;
