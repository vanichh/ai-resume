import type { Ref, TextareaHTMLAttributes } from 'react';

export type TextareaVariantType = 'code' | 'default';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  fullWidth?: boolean;
  minHeight?: number;
  ref?: Ref<HTMLTextAreaElement>;
  variant?: TextareaVariantType;
};
