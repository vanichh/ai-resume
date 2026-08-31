import { saveResumeWorkspace } from '@common/utils/resumeWorkspaceStorage';

import type { ResumeStoreType } from '../../types';

export const persistWorkspace = (state: ResumeStoreType): void => {
  saveResumeWorkspace({
    activeAnalysisId: state.activeAnalysisId,
    advice: state.advice,
    analysisHistory: state.analysisHistory,
    comparisonVacancies: state.comparisonVacancies,
    coverLetter: state.coverLetter,
    coverLetterCompanyName: state.coverLetterCompanyName,
    coverLetterCompanyType: state.coverLetterCompanyType,
    coverLetterHistory: state.coverLetterHistory,
    coverLetterLength: state.coverLetterLength,
    coverLetterTone: state.coverLetterTone,
    coverLetterVariantsCount: state.coverLetterVariantsCount,
    resumeText: state.resumeText,
    targetRole: state.targetRole,
    translation: state.translation,
    translationHistory: state.translationHistory,
    translationLanguage: state.translationLanguage,
    translationTone: state.translationTone,
    vacancyText: state.vacancyText,
  });
};
