import clsx from 'clsx';

import type { ButtonProps } from './types';

import styles from './Button.module.scss';

const BUTTON_SIZE_CLASS_NAMES = {
  large: styles.root_large,
  medium: styles.root_medium,
  small: styles.root_small,
};

const BUTTON_VARIANT_CLASS_NAMES = {
  ghost: styles.root_ghost,
  primary: styles.root_primary,
  secondary: styles.root_secondary,
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
      className={clsx(styles.root, BUTTON_VARIANT_CLASS_NAMES[variant], BUTTON_SIZE_CLASS_NAMES[size], className, {
        [styles.root_fullWidth]: fullWidth,
      })}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
