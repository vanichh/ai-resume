import { copyToClipboard } from '@common/utils/copyToClipboard';

import { useResumeStore } from '@store/resumeStore';

const DEFAULT_SUCCESS_MESSAGE = 'Скопировано.';

export function useCopyToClipboardNotification() {
  const showSuccessMessage = useResumeStore((state) => state.showSuccessMessage);

  return async function copyWithNotification(value: string, successMessage = DEFAULT_SUCCESS_MESSAGE) {
    await copyToClipboard(value);
    showSuccessMessage(successMessage);
  };
}
