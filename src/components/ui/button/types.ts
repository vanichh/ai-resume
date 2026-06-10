import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'ghost' | 'primary' | 'secondary';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  fullWidth?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};
