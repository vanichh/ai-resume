export type ToastVariant = 'error' | 'success';

export type ToastProps = {
  autoCloseDelay?: number;
  message: string;
  variant: ToastVariant;
  onClose: () => void;
};
