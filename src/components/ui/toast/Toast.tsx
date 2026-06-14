import { useEffect } from 'react';

import clsx from 'clsx';
import { X } from 'lucide-react';

import type { ToastProps } from './types';

import styles from './Toast.module.scss';

const DEFAULT_AUTO_CLOSE_DELAY = 3000;

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
    <div className={clsx(styles.toast, styles[`toast_${variant}`])} role="alert">
      <p className={styles.toast__message}>{message}</p>
      <button className={styles.toast__closeButton} type="button" aria-label="Закрыть уведомление" onClick={onClose}>
        <X aria-hidden size={18} />
      </button>
    </div>
  );
};
