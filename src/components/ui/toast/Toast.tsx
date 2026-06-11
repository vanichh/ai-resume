import { useEffect } from 'react';

import type { ToastProps } from './types';

import styles from './Toast.module.scss';

const DEFAULT_AUTO_CLOSE_DELAY = 3000;

export function Toast({ autoCloseDelay = DEFAULT_AUTO_CLOSE_DELAY, message, onClose, variant }: ToastProps) {
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
    <div className={`${styles.toast} ${styles[`toast_${variant}`]}`} role="alert">
      <p className={styles.toast__message}>{message}</p>
      <button className={styles.toast__closeButton} type="button" aria-label="Закрыть уведомление" onClick={onClose}>
        ×
      </button>
    </div>
  );
}
