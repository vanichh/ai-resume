import { canUseModel } from './common/utils/canUseModel';

import type { ResumeStore } from './types';

export function selectCanAnalyze({ modelStatus, resumeText, status }: ResumeStore) {
  return status === 'ready' && resumeText.length > 0 && canUseModel(modelStatus);
}

export function selectCanTranslate({ modelStatus, resumeText, status }: ResumeStore) {
  return (
    resumeText.length > 0 &&
    status !== 'parsing' &&
    status !== 'analyzing' &&
    status !== 'translating' &&
    canUseModel(modelStatus)
  );
}

export function selectCanCompareVacancies({ comparisonVacancies, modelStatus, resumeText, status }: ResumeStore) {
  return (
    resumeText.length > 0 &&
    status !== 'parsing' &&
    status !== 'analyzing' &&
    status !== 'translating' &&
    comparisonVacancies.some((vacancy) => vacancy.vacancyText.trim()) &&
    canUseModel(modelStatus)
  );
}

export function selectCanGenerateCoverLetter({ coverLetterStatus, modelStatus, resumeText, status }: ResumeStore) {
  return (
    resumeText.length > 0 &&
    coverLetterStatus !== 'generating' &&
    status !== 'parsing' &&
    status !== 'analyzing' &&
    status !== 'translating' &&
    canUseModel(modelStatus)
  );
}
