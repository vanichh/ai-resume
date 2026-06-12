import type { ReactNode } from 'react';

import type { ButtonVariantType } from '../button';

export type ModalProps = {
  cancelLabel?: string;
  children?: ReactNode;
  confirmLabel?: string;
  confirmVariant?: ButtonVariantType;
  description?: string;
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
};
