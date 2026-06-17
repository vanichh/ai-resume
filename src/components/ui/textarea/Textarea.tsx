import type { CSSProperties } from 'react';

import clsx from 'clsx';

import type { TextareaProps } from './types';

import styles from './Textarea.module.scss';

const TEXTAREA_VARIANT_CLASS_NAMES = {
  code: styles.root_code,
  default: styles.root_default,
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
      className={clsx(styles.root, TEXTAREA_VARIANT_CLASS_NAMES[variant], className, {
        [styles.root_fullWidth]: fullWidth,
      })}
      ref={ref}
      style={textareaStyle}
      {...props}
    />
  );
};
