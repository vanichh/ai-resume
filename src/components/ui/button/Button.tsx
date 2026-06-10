import styles from './Button.module.scss';
import type { ButtonProps } from './types';

export function Button({
  children,
  className = '',
  fullWidth = false,
  size = 'medium',
  type = 'button',
  variant = 'secondary',
  ...props
}: ButtonProps) {
  const classNames = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    fullWidth ? styles.button_fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classNames} type={type} {...props}>
      {children}
    </button>
  );
}
