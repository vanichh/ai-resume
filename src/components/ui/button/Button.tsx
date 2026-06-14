import clsx from 'clsx';

import type { ButtonProps } from './types';

import styles from './Button.module.scss';

export const Button = ({
  children,
  className = '',
  fullWidth = false,
  size = 'medium',
  type = 'button',
  variant = 'secondary',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, styles[`button_${variant}`], styles[`button_${size}`], className, {
        [styles.button_fullWidth]: fullWidth,
      })}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
