import type {
  AppStatus,
  ModelStatus,
  ResumeAdvice,
  ResumeTranslation,
  ResumeTranslationLanguage,
  ResumeTranslationTone,
} from '@common/types';

export type ResumeState = {
  advice: ResumeAdvice | null;
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
  analyze: () => Promise<void>;
  checkModelStatus: () => Promise<void>;
  clearError: () => void;
  parseFile: (file: File) => Promise<void>;
  restoreWorkspace: () => void;
  selectTranslation: (id: string) => void;
  setResumeText: (value: string) => void;
  setTargetRole: (value: string) => void;
  setTranslationText: (value: string) => void;
  setTranslationLanguage: (value: ResumeTranslationLanguage) => void;
  setTranslationTone: (value: ResumeTranslationTone) => void;
  setVacancyText: (value: string) => void;
  translate: () => Promise<void>;
};

export type ResumeStore = ResumeState & ResumeActions;
