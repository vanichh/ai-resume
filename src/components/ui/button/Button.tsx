import clsx from 'clsx';

import type { ButtonProps } from './types';

import styles from './Button.module.scss';

const BUTTON_SIZE_CLASS_NAMES = {
  large: styles.button_large,
  medium: styles.button_medium,
  small: styles.button_small,
};

const BUTTON_VARIANT_CLASS_NAMES = {
  ghost: styles.button_ghost,
  primary: styles.button_primary,
  secondary: styles.button_secondary,
};

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
      className={clsx(styles.button, BUTTON_VARIANT_CLASS_NAMES[variant], BUTTON_SIZE_CLASS_NAMES[size], className, {
        [styles.button_fullWidth]: fullWidth,
      })}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
