import { RESUME_WORKSPACE_STORAGE_KEY } from '@common/constants';
import type {
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
  resumeText: string;
  targetRole: string;
  translation: ResumeTranslationType | null;
  translationHistory: ResumeTranslationType[];
  translationLanguage: ResumeTranslationLanguageType;
  translationTone: ResumeTranslationToneType;
  vacancyText: string;
};

export function loadResumeWorkspace(): Partial<StoredResumeWorkspaceType> {
  try {
    const rawValue = localStorage.getItem(RESUME_WORKSPACE_STORAGE_KEY);
    if (!rawValue) {
      return {};
    }

    return JSON.parse(rawValue) as Partial<StoredResumeWorkspaceType>;
  } catch {
    return {};
  }
}

export function saveResumeWorkspace(value: StoredResumeWorkspaceType): void {
  localStorage.setItem(RESUME_WORKSPACE_STORAGE_KEY, JSON.stringify(value));
}

export function clearResumeWorkspace(): void {
  localStorage.removeItem(RESUME_WORKSPACE_STORAGE_KEY);
}

export function getResumeWorkspaceStorageSize(): number {
  return new Blob([localStorage.getItem(RESUME_WORKSPACE_STORAGE_KEY) ?? '']).size;
}
