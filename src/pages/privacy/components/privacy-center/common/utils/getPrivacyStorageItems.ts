import type { GetPrivacyStorageItemsParamsType, PrivacyStorageItemType } from '../../types';

export const getPrivacyStorageItems = ({
  analysisHistoryCount,
  comparisonVacanciesCount,
  hasCoverLetter,
  resumeText,
  storageSize,
  translationHistoryCount,
}: GetPrivacyStorageItemsParamsType): PrivacyStorageItemType[] => [
  {
    label: 'Текст резюме',
    value: resumeText ? 'сохранен' : 'не сохранен',
  },
  {
    label: 'История анализов',
    value: analysisHistoryCount,
  },
  {
    label: 'Переводы',
    value: translationHistoryCount,
  },
  {
    label: 'Сравнения вакансий',
    value: comparisonVacanciesCount,
  },
  {
    label: 'Сопроводительное письмо',
    value: hasCoverLetter ? 'сохранено' : 'не сохранено',
  },
  {
    label: 'Размер данных',
    value: storageSize,
  },
];
