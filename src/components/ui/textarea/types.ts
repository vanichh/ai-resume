import type { TextareaHTMLAttributes } from 'react';

export type TextareaVariant = 'code' | 'default';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  fullWidth?: boolean;
  minHeight?: number;
  variant?: TextareaVariant;
};
