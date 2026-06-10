import styles from './Toast.module.scss';
import type { ToastProps } from './types';

export function Toast({ message, onClose, variant }: ToastProps) {
  if (!message) {
    return null;
  }

  return (
    <div className={`${styles.toast} ${styles[`toast_${variant}`]}`} role="alert">
      <p className={styles.toast__message}>{message}</p>
      <button className={styles.toast__closeButton} type="button" aria-label="Закрыть уведомление" onClick={onClose}>
        Закрыть
      </button>
    </div>
  );
}
