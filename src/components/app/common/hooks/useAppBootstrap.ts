import { useEffect } from 'react';

import { useResumeStore } from '@store/resumeStore';

export function useAppBootstrap(): void {
  const checkModelStatus = useResumeStore((state) => state.checkModelStatus);
  const restoreWorkspace = useResumeStore((state) => state.restoreWorkspace);

  useEffect(() => {
    restoreWorkspace();
    void checkModelStatus();
  }, [checkModelStatus, restoreWorkspace]);
}
