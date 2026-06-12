import type { SelectProps } from './types';

import styles from './Select.module.scss';

export function Select({
  className = '',
  fullWidth = true,
  options,
  placeholder,
  size = 'medium',
  ...props
}: SelectProps) {
  const classNames = [styles.select, styles[`select_${size}`], fullWidth ? styles.select_fullWidth : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames}>
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
}
