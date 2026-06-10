import { Toast } from '@components/ui';

import { useResumeStore } from '@store/resumeStore';

export function AppToast() {
  const clearError = useResumeStore((state) => state.clearError);
  const error = useResumeStore((state) => state.error);

  return <Toast message={error} variant="error" onClose={clearError} />;
}
