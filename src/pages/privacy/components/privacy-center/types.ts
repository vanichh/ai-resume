export type PrivacyStorageItemType = {
  label: string;
  value: string | number;
};

export type GetPrivacyStorageItemsParamsType = {
  analysisHistoryCount: number;
  comparisonVacanciesCount: number;
  hasCoverLetter: boolean;
  resumeText: string;
  storageSize: string;
  translationHistoryCount: number;
};
