import { canUseModel } from './common/utils/canUseModel';

import type { ResumeStoreType } from './types';

export const selectCanAnalyze = ({ modelStatus, resumeText, status }: ResumeStoreType) => {
  return status === 'ready' && resumeText.length > 0 && canUseModel(modelStatus);
};

export const selectCanTranslate = ({ modelStatus, resumeText, status }: ResumeStoreType) => {
  return (
    resumeText.length > 0 &&
    status !== 'parsing' &&
    status !== 'analyzing' &&
    status !== 'translating' &&
    canUseModel(modelStatus)
  );
};

export const selectCanCompareVacancies = ({
  comparisonVacancies,
  modelStatus,
  resumeText,
  status,
}: ResumeStoreType) => {
  return (
    resumeText.length > 0 &&
    status !== 'parsing' &&
    status !== 'analyzing' &&
    status !== 'translating' &&
    comparisonVacancies.some((vacancy) => vacancy.vacancyText.trim()) &&
    canUseModel(modelStatus)
  );
};

export const selectCanGenerateCoverLetter = ({
  coverLetterStatus,
  modelStatus,
  resumeText,
  status,
}: ResumeStoreType) => {
  return (
    resumeText.length > 0 &&
    coverLetterStatus !== 'generating' &&
    status !== 'parsing' &&
    status !== 'analyzing' &&
    status !== 'translating' &&
    canUseModel(modelStatus)
  );
};
