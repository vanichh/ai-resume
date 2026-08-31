import { i18n } from '@i18n/index';

import type { CoverLetterType } from '@common/types';
import { clearResumeWorkspace, loadResumeWorkspace } from '@common/utils/resumeWorkspaceStorage';
import { getLanguageModelStatus } from '@services/resume-advisor';

import type { ResumeSliceCreatorType } from './types';

import { MODEL_HINTS } from '../common/constants';
import type { AppActionsType, ResumeStateType } from '../types';

const clearedWorkspaceState: Omit<ResumeStateType, 'modelHint' | 'modelStatus'> = {
  activeAnalysisId: null,
  advice: null,
  analysisStage: null,
  analysisHistory: [],
  comparisonVacancies: [],
  coverLetter: null,
  coverLetterCompanyName: '',
  coverLetterCompanyType: 'product' as const,
  coverLetterHistory: [],
  coverLetterLength: 'standard' as const,
  coverLetterStatus: 'idle' as const,
  coverLetterTone: 'business' as const,
  coverLetterVariantsCount: 1,
  correctedResumeStatus: 'idle' as const,
  correctedResumeText: '',
  downloadProgress: null,
  error: '',
  fileName: '',
  resumeText: '',
  status: 'idle' as const,
  successMessage: '',
  targetRole: '',
  translation: null,
  translationHistory: [],
  translationLanguage: 'english' as const,
  translationTone: 'atsFriendly' as const,
  vacancyText: '',
};

const normalizeCoverLetter = (coverLetter: CoverLetterType): CoverLetterType => ({
  ...coverLetter,
  companyName: coverLetter.companyName ?? '',
  sourceAnalysisId: coverLetter.sourceAnalysisId ?? null,
});

export const createAppSlice: ResumeSliceCreatorType<AppActionsType> = (set) => ({
  async checkModelStatus() {
    try {
      const modelStatus = await getLanguageModelStatus();

      set({
        modelHint: MODEL_HINTS[modelStatus] ? i18n.t(MODEL_HINTS[modelStatus]) : '',
        modelStatus,
      });
    } catch {
      set({
        modelHint: i18n.t(MODEL_HINTS.unavailable),
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
    set({ ...clearedWorkspaceState, successMessage: i18n.t('workspace.messages.workspaceCleared') });
  },

  markLanguageModelReady() {
    set({
      downloadProgress: null,
      modelHint: '',
      modelStatus: 'available',
    });
  },

  restoreWorkspace() {
    const stored = loadResumeWorkspace();
    const coverLetter = stored.coverLetter ? normalizeCoverLetter(stored.coverLetter) : null;
    const coverLetterHistory = (stored.coverLetterHistory ?? (coverLetter ? [coverLetter] : [])).map(
      normalizeCoverLetter,
    );
    set({
      activeAnalysisId: stored.activeAnalysisId ?? null,
      analysisHistory: stored.analysisHistory?.map((item) => ({ ...item, note: item.note ?? '' })) ?? [],
      resumeText: stored.resumeText ?? '',
      advice: stored.advice ?? null,
      comparisonVacancies: stored.comparisonVacancies ?? [],
      coverLetter,
      coverLetterCompanyName: stored.coverLetterCompanyName ?? coverLetter?.companyName ?? '',
      coverLetterCompanyType: stored.coverLetterCompanyType ?? 'product',
      coverLetterHistory,
      coverLetterLength: stored.coverLetterLength ?? 'standard',
      coverLetterStatus: coverLetter ? 'done' : 'idle',
      coverLetterTone: stored.coverLetterTone ?? 'business',
      coverLetterVariantsCount: stored.coverLetterVariantsCount ?? 1,
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
