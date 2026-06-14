import { useShallow } from 'zustand/react/shallow';

import { Toast } from '@components/ui';
import { useResumeStore } from '@store/resumeStore';

import { selectAppToastState } from './common/selectors';

export const AppToast = () => {
  const { clearError, clearSuccessMessage, error, successMessage } = useResumeStore(useShallow(selectAppToastState));

  if (error) {
    return <Toast message={error} variant="error" onClose={clearError} />;
  }

  return <Toast message={successMessage} variant="success" onClose={clearSuccessMessage} />;
};
