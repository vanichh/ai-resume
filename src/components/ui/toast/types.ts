export type ToastVariantType = 'error' | 'success';

export type ToastProps = {
  autoCloseDelay?: number;
  message: string;
  variant: ToastVariantType;
  onClose: () => void;
};
