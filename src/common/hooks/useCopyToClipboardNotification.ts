import { useTranslation } from 'react-i18next';

import { copyToClipboard } from '@common/utils/copyToClipboard';
import { useResumeStore } from '@store/resumeStore';

export const useCopyToClipboardNotification = () => {
  const { t } = useTranslation();
  const showSuccessMessage = useResumeStore((state) => state.showSuccessMessage);

  const copyWithNotification = async (value: string, successMessage = t('common.copied')) => {
    await copyToClipboard(value);
    showSuccessMessage(successMessage);
  };

  return copyWithNotification;
};
