import { copyToClipboard } from '@common/utils/copyToClipboard';
import { useResumeStore } from '@store/resumeStore';

const DEFAULT_SUCCESS_MESSAGE = 'Скопировано.';

export const useCopyToClipboardNotification = () => {
  const showSuccessMessage = useResumeStore((state) => state.showSuccessMessage);

  const copyWithNotification = async (value: string, successMessage = DEFAULT_SUCCESS_MESSAGE) => {
    await copyToClipboard(value);
    showSuccessMessage(successMessage);
  };

  return copyWithNotification;
};
