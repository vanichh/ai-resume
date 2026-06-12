import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariantType = 'ghost' | 'primary' | 'secondary';

export type ButtonSizeType = 'small' | 'medium' | 'large';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  fullWidth?: boolean;
  size?: ButtonSizeType;
  variant?: ButtonVariantType;
};
