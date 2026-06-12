import type { TextareaHTMLAttributes } from 'react';

export type TextareaVariantType = 'code' | 'default';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  fullWidth?: boolean;
  minHeight?: number;
  variant?: TextareaVariantType;
};
