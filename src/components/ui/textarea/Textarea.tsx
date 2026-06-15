import type { CSSProperties } from 'react';

import clsx from 'clsx';

import type { TextareaProps } from './types';

import styles from './Textarea.module.scss';

const TEXTAREA_VARIANT_CLASS_NAMES = {
  code: styles.textarea_code,
  default: styles.textarea_default,
};

export const Textarea = ({
  className = '',
  fullWidth = true,
  minHeight,
  ref,
  style,
  variant = 'default',
  ...props
}: TextareaProps) => {
  const textareaStyle: CSSProperties = {
    ...style,
    ...(minHeight ? { minHeight } : null),
  };

  return (
    <textarea
      className={clsx(styles.textarea, TEXTAREA_VARIANT_CLASS_NAMES[variant], className, {
        [styles.textarea_fullWidth]: fullWidth,
      })}
      ref={ref}
      style={textareaStyle}
      {...props}
    />
  );
};
