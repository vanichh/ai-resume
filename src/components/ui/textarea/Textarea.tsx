import type { CSSProperties } from 'react';

import clsx from 'clsx';

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
  const textareaStyle: CSSProperties = {
    ...style,
    ...(minHeight ? { minHeight } : null),
  };

  return (
    <textarea
      className={clsx(styles.textarea, styles[`textarea_${variant}`], className, {
        [styles.textarea_fullWidth]: fullWidth,
      })}
      style={textareaStyle}
      {...props}
    />
  );
}
