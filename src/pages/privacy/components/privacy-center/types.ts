export type PrivacyStorageItemType = {
  labelKey:
    | 'workspace.privacy.items.comparisons'
    | 'workspace.privacy.items.coverLetter'
    | 'workspace.privacy.items.history'
    | 'workspace.privacy.items.resume'
    | 'workspace.privacy.items.size'
    | 'workspace.privacy.items.translations';
  value: string | number;
};

export type GetPrivacyStorageItemsParamsType = {
  analysisHistoryCount: number;
  comparisonVacanciesCount: number;
  coverLetterHistoryCount: number;
  resumeText: string;
  saved: string;
  notSaved: string;
  storageSize: string;
  translationHistoryCount: number;
};
