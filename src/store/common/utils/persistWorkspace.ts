import { saveResumeWorkspace } from '@common/utils/resumeWorkspaceStorage';

import type { ResumeStore } from '../../types';

export function persistWorkspace(state: ResumeStore): void {
  saveResumeWorkspace({
    advice: state.advice,
    analysisHistory: state.analysisHistory,
    comparisonVacancies: state.comparisonVacancies,
    coverLetter: state.coverLetter,
    resumeText: state.resumeText,
    targetRole: state.targetRole,
    translation: state.translation,
    translationHistory: state.translationHistory,
    translationLanguage: state.translationLanguage,
    translationTone: state.translationTone,
    vacancyText: state.vacancyText,
  });
}
