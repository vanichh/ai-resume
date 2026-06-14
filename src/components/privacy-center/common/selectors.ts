import type { ResumeStoreType } from '@store/types';

export const selectPrivacyCenterState = (state: ResumeStoreType) => ({
  analysisHistoryCount: state.analysisHistory.length,
  clearWorkspace: state.clearWorkspace,
  comparisonVacanciesCount: state.comparisonVacancies.length,
  coverLetter: state.coverLetter,
  resumeText: state.resumeText,
  translationHistoryCount: state.translationHistory.length,
});
