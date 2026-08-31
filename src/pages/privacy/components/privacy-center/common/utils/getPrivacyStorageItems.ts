import type { GetPrivacyStorageItemsParamsType, PrivacyStorageItemType } from '../../types';

export const getPrivacyStorageItems = ({
  analysisHistoryCount,
  comparisonVacanciesCount,
  coverLetterHistoryCount,
  notSaved,
  resumeText,
  saved,
  storageSize,
  translationHistoryCount,
}: GetPrivacyStorageItemsParamsType): PrivacyStorageItemType[] => [
  {
    labelKey: 'workspace.privacy.items.resume',
    value: resumeText ? saved : notSaved,
  },
  {
    labelKey: 'workspace.privacy.items.history',
    value: analysisHistoryCount,
  },
  {
    labelKey: 'workspace.privacy.items.translations',
    value: translationHistoryCount,
  },
  {
    labelKey: 'workspace.privacy.items.comparisons',
    value: comparisonVacanciesCount,
  },
  {
    labelKey: 'workspace.privacy.items.coverLetter',
    value: coverLetterHistoryCount,
  },
  {
    labelKey: 'workspace.privacy.items.size',
    value: storageSize,
  },
];
