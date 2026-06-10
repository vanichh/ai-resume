export type ToastVariant = 'error';

export type ToastProps = {
  message: string;
  variant: ToastVariant;
  onClose: () => void;
};
