import { useEffect } from 'react';

import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

import type { ModalProps } from './types';

import { Button } from '../button';

import styles from './Modal.module.scss';

export function Modal({
  cancelLabel = 'Отмена',
  children,
  confirmLabel = 'Подтвердить',
  confirmVariant = 'primary',
  description,
  isOpen,
  title,
  onClose,
  onConfirm,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.modal} role="presentation" onMouseDown={onClose}>
      <section
        aria-modal="true"
        className={styles.modal__content}
        role="dialog"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className={styles.modal__header}>
          <h2 className={styles.modal__title} id="modal-title">
            {title}
          </h2>
          <button className={styles.modal__closeButton} type="button" aria-label="Закрыть окно" onClick={onClose}>
            <X aria-hidden size={18} />
          </button>
        </header>
        {description && <p className={styles.modal__description}>{description}</p>}
        {children && <div className={styles.modal__body}>{children}</div>}
        <footer className={styles.modal__actions}>
          <Button size="medium" variant="secondary" onClick={onClose}>
            {cancelLabel}
          </Button>
          {onConfirm && (
            <Button size="medium" variant={confirmVariant} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          )}
        </footer>
      </section>
    </div>,
    document.body,
  );
}
