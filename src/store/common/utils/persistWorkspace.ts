import { saveResumeWorkspace } from '@common/utils/resumeWorkspaceStorage';

import type { ResumeStoreType } from '../../types';

export const persistWorkspace = (state: ResumeStoreType): void => {
  saveResumeWorkspace({
    advice: state.advice,
    analysisHistory: state.analysisHistory,
    comparisonVacancies: state.comparisonVacancies,
    coverLetter: state.coverLetter,
    coverLetterCompanyType: state.coverLetterCompanyType,
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
