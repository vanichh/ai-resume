import { useEffect } from 'react';

export const useLockDocumentScroll = (isLocked: boolean): void => {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    const bodyOverflow = document.body.style.overflow;
    const documentOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = documentOverflow;
    };
  }, [isLocked]);
};
