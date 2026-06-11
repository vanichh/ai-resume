import type { CSSProperties } from 'react';

import type { TextareaProps } from './types';

import styles from './Textarea.module.scss';

export function Textarea({
  className = '',
  fullWidth = true,
  minHeight,
  style,
  variant = 'default',
  ...props
}: TextareaProps) {
  const classNames = [
    styles.textarea,
    styles[`textarea_${variant}`],
    fullWidth ? styles.textarea_fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const textareaStyle: CSSProperties = {
    ...style,
    ...(minHeight ? { minHeight } : null),
  };

  return <textarea className={classNames} style={textareaStyle} {...props} />;
}
