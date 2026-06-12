import type {
  AppStatusType,
  CoverLetterStatusType,
  CoverLetterType,
  ModelStatusType,
  ResumeAdviceType,
  ResumeAnalysisHistoryItemType,
  ResumeTranslationLanguageType,
  ResumeTranslationToneType,
  ResumeTranslationType,
  VacancyComparisonItemType,
} from '@common/types';

export type ResumeStateType = {
  advice: ResumeAdviceType | null;
  analysisHistory: ResumeAnalysisHistoryItemType[];
  comparisonVacancies: VacancyComparisonItemType[];
  coverLetter: CoverLetterType | null;
  coverLetterStatus: CoverLetterStatusType;
  downloadProgress: number | null;
  error: string;
  fileName: string;
  modelHint: string;
  modelStatus: ModelStatusType;
  resumeText: string;
  status: AppStatusType;
  successMessage: string;
  targetRole: string;
  translation: ResumeTranslationType | null;
  translationHistory: ResumeTranslationType[];
  translationLanguage: ResumeTranslationLanguageType;
  translationTone: ResumeTranslationToneType;
  vacancyText: string;
};

export type AppActionsType = {
  checkModelStatus: () => Promise<void>;
  clearError: () => void;
  clearSuccessMessage: () => void;
  clearWorkspace: () => void;
  restoreWorkspace: () => void;
  showSuccessMessage: (message: string) => void;
};

export type ResumeActionsType = {
  analyze: () => Promise<void>;
  parseFile: (file: File) => Promise<void>;
  setResumeText: (value: string) => void;
  setTargetRole: (value: string) => void;
  setVacancyText: (value: string) => void;
};

export type HistoryActionsType = {
  clearAnalysisHistory: () => void;
  removeAnalysisHistoryItem: (id: string) => void;
  selectAnalysisHistoryItem: (id: string) => void;
  setAnalysisHistoryNote: (id: string, value: string) => void;
};

export type ComparisonActionsType = {
  addComparisonVacancy: () => void;
  analyzeComparison: () => Promise<void>;
  removeComparisonVacancy: (id: string) => void;
  selectComparisonVacancy: (id: string) => void;
  setComparisonVacancyText: (id: string, value: string) => void;
  setComparisonVacancyTitle: (id: string, value: string) => void;
};

export type CoverLetterActionsType = {
  generateCoverLetter: () => Promise<void>;
  setCoverLetterText: (value: string) => void;
};

export type TranslationActionsType = {
  selectTranslation: (id: string) => void;
  setTranslationText: (value: string) => void;
  setTranslationLanguage: (value: ResumeTranslationLanguageType) => void;
  setTranslationTone: (value: ResumeTranslationToneType) => void;
  translate: () => Promise<void>;
};

export type ResumeStoreType = ResumeStateType &
  AppActionsType &
  ResumeActionsType &
  HistoryActionsType &
  ComparisonActionsType &
  CoverLetterActionsType &
  TranslationActionsType;
