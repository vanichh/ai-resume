import type {
  AppStatus,
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
  downloadProgress: number | null;
  error: string;
  fileName: string;
  modelHint: string;
  modelStatus: ModelStatus;
  resumeText: string;
  status: AppStatus;
  targetRole: string;
  translation: ResumeTranslation | null;
  translationHistory: ResumeTranslation[];
  translationLanguage: ResumeTranslationLanguage;
  translationTone: ResumeTranslationTone;
  vacancyText: string;
};

export type ResumeActions = {
  addComparisonVacancy: () => void;
  analyze: () => Promise<void>;
  analyzeComparison: () => Promise<void>;
  checkModelStatus: () => Promise<void>;
  clearError: () => void;
  clearAnalysisHistory: () => void;
  removeAnalysisHistoryItem: (id: string) => void;
  removeComparisonVacancy: (id: string) => void;
  parseFile: (file: File) => Promise<void>;
  restoreWorkspace: () => void;
  selectAnalysisHistoryItem: (id: string) => void;
  selectComparisonVacancy: (id: string) => void;
  selectTranslation: (id: string) => void;
  setComparisonVacancyText: (id: string, value: string) => void;
  setComparisonVacancyTitle: (id: string, value: string) => void;
  setResumeText: (value: string) => void;
  setTargetRole: (value: string) => void;
  setTranslationText: (value: string) => void;
  setTranslationLanguage: (value: ResumeTranslationLanguage) => void;
  setTranslationTone: (value: ResumeTranslationTone) => void;
  setVacancyText: (value: string) => void;
  translate: () => Promise<void>;
};

export type ResumeStore = ResumeState & ResumeActions;
