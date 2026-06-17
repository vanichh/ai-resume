import type { MouseEvent } from 'react';
import { useEffect } from 'react';

import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

import type { ModalProps } from './types';

import { Button } from '../button';

import styles from './Modal.module.scss';

export const Modal = ({
  cancelLabel = 'Отмена',
  children,
  confirmLabel = 'Подтвердить',
  confirmVariant = 'primary',
  description,
  isOpen,
  title,
  onClose,
  onConfirm,
}: ModalProps) => {
  const onContentMouseDown = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.root} role="presentation" onMouseDown={onClose}>
      <section
        aria-modal="true"
        className={styles.root__content}
        role="dialog"
        aria-labelledby="modal-title"
        onMouseDown={onContentMouseDown}
      >
        <header className={styles.root__header}>
          <h2 className={styles.root__title} id="modal-title">
            {title}
          </h2>
          <Button
            aria-label="Закрыть окно"
            className={styles.root__closeButton}
            size="small"
            variant="ghost"
            onClick={onClose}
          >
            <X aria-hidden size={18} />
          </Button>
        </header>
        {description && <p className={styles.root__description}>{description}</p>}
        {children && <div className={styles.root__body}>{children}</div>}
        <footer className={styles.root__actions}>
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
};
