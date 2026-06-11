import { RESUME_WORKSPACE_STORAGE_KEY } from '@common/constants';
import type {
  CoverLetter,
  ResumeAdvice,
  ResumeAnalysisHistoryItem,
  ResumeTranslation,
  ResumeTranslationLanguage,
  ResumeTranslationTone,
  VacancyComparisonItem,
} from '@common/types';

export type StoredResumeWorkspace = {
  advice: ResumeAdvice | null;
  analysisHistory: ResumeAnalysisHistoryItem[];
  comparisonVacancies: VacancyComparisonItem[];
  coverLetter: CoverLetter | null;
  resumeText: string;
  targetRole: string;
  translation: ResumeTranslation | null;
  translationHistory: ResumeTranslation[];
  translationLanguage: ResumeTranslationLanguage;
  translationTone: ResumeTranslationTone;
  vacancyText: string;
};

export function loadResumeWorkspace(): Partial<StoredResumeWorkspace> {
  try {
    const rawValue = localStorage.getItem(RESUME_WORKSPACE_STORAGE_KEY);
    if (!rawValue) {
      return {};
    }

    return JSON.parse(rawValue) as Partial<StoredResumeWorkspace>;
  } catch {
    return {};
  }
}

export function saveResumeWorkspace(value: StoredResumeWorkspace): void {
  localStorage.setItem(RESUME_WORKSPACE_STORAGE_KEY, JSON.stringify(value));
}

export function clearResumeWorkspace(): void {
  localStorage.removeItem(RESUME_WORKSPACE_STORAGE_KEY);
}

export function getResumeWorkspaceStorageSize(): number {
  return new Blob([localStorage.getItem(RESUME_WORKSPACE_STORAGE_KEY) ?? '']).size;
}
