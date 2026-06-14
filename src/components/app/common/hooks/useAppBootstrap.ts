import { useEffect } from 'react';

import { useShallow } from 'zustand/react/shallow';

import { useResumeStore } from '@store/resumeStore';

import { selectAppBootstrapState } from '../selectors';

export const useAppBootstrap = (): void => {
  const { checkModelStatus, restoreWorkspace } = useResumeStore(useShallow(selectAppBootstrapState));

  useEffect(() => {
    restoreWorkspace();
    void checkModelStatus();
  }, [checkModelStatus, restoreWorkspace]);
};
