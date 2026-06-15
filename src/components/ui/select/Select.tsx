import clsx from 'clsx';

import type { SelectProps } from './types';

import styles from './Select.module.scss';

const SELECT_SIZE_CLASS_NAMES = {
  medium: styles.select_medium,
  small: styles.select_small,
};

export const Select = ({
  className = '',
  fullWidth = true,
  options,
  placeholder,
  size = 'medium',
  ...props
}: SelectProps) => {
  return (
    <span
      className={clsx(styles.select, SELECT_SIZE_CLASS_NAMES[size], className, {
        [styles.select_fullWidth]: fullWidth,
      })}
    >
      <select className={styles.select__control} {...props}>
        {placeholder ? (
          <option disabled hidden value="">
            {placeholder}
          </option>
        ) : null}
        {options.map(({ disabled = false, label, value }) => (
          <option disabled={disabled} key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </span>
  );
};
