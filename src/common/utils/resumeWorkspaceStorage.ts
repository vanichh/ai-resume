import { RESUME_WORKSPACE_STORAGE_KEY } from '@common/constants';
import type {
  CoverLetterCompanyType,
  CoverLetterLengthType,
  CoverLetterToneType,
  CoverLetterType,
  ResumeAdviceType,
  ResumeAnalysisHistoryItemType,
  ResumeTranslationLanguageType,
  ResumeTranslationToneType,
  ResumeTranslationType,
  VacancyComparisonItemType,
} from '@common/types';

export type StoredResumeWorkspaceType = {
  advice: ResumeAdviceType | null;
  analysisHistory: ResumeAnalysisHistoryItemType[];
  comparisonVacancies: VacancyComparisonItemType[];
  coverLetter: CoverLetterType | null;
  coverLetterCompanyType: CoverLetterCompanyType;
  coverLetterLength: CoverLetterLengthType;
  coverLetterTone: CoverLetterToneType;
  coverLetterVariantsCount: number;
  resumeText: string;
  targetRole: string;
  translation: ResumeTranslationType | null;
  translationHistory: ResumeTranslationType[];
  translationLanguage: ResumeTranslationLanguageType;
  translationTone: ResumeTranslationToneType;
  vacancyText: string;
};

export const loadResumeWorkspace = (): Partial<StoredResumeWorkspaceType> => {
  try {
    const rawValue = localStorage.getItem(RESUME_WORKSPACE_STORAGE_KEY);
    if (!rawValue) {
      return {};
    }

    return JSON.parse(rawValue) as Partial<StoredResumeWorkspaceType>;
  } catch {
    return {};
  }
};

export const saveResumeWorkspace = (value: StoredResumeWorkspaceType): void => {
  localStorage.setItem(RESUME_WORKSPACE_STORAGE_KEY, JSON.stringify(value));
};

export const clearResumeWorkspace = (): void => {
  localStorage.removeItem(RESUME_WORKSPACE_STORAGE_KEY);
};

export const getResumeWorkspaceStorageSize = (): number => {
  return new Blob([localStorage.getItem(RESUME_WORKSPACE_STORAGE_KEY) ?? '']).size;
};
