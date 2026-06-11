import { Toast } from '@components/ui';

import { useResumeStore } from '@store/resumeStore';

export function AppToast() {
  const clearError = useResumeStore((state) => state.clearError);
  const clearSuccessMessage = useResumeStore((state) => state.clearSuccessMessage);
  const error = useResumeStore((state) => state.error);
  const successMessage = useResumeStore((state) => state.successMessage);

  if (error) {
    return <Toast message={error} variant="error" onClose={clearError} />;
  }

  return <Toast message={successMessage} variant="success" onClose={clearSuccessMessage} />;
}
