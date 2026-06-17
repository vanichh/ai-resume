import { useEffect } from 'react';

import clsx from 'clsx';
import { X } from 'lucide-react';

import type { ToastProps } from './types';

import { Button } from '../button';

import styles from './Toast.module.scss';

const DEFAULT_AUTO_CLOSE_DELAY = 3000;

const TOAST_VARIANT_CLASS_NAMES = {
  error: styles.root_error,
  success: styles.root_success,
};

export const Toast = ({ autoCloseDelay = DEFAULT_AUTO_CLOSE_DELAY, message, onClose, variant }: ToastProps) => {
  useEffect(() => {
    if (!message || autoCloseDelay <= 0) {
      return;
    }

    const timeoutId = window.setTimeout(onClose, autoCloseDelay);

    return () => window.clearTimeout(timeoutId);
  }, [autoCloseDelay, message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div className={clsx(styles.root, TOAST_VARIANT_CLASS_NAMES[variant])} role="alert">
      <p className={styles.root__message}>{message}</p>
      <Button
        aria-label="Закрыть уведомление"
        className={styles.root__closeButton}
        size="small"
        variant="ghost"
        onClick={onClose}
      >
        <X aria-hidden size={18} />
      </Button>
    </div>
  );
};
