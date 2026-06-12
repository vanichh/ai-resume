import type { SelectHTMLAttributes } from 'react';

export type SelectSizeType = 'medium' | 'small';

export type SelectOptionType = {
  disabled?: boolean;
  label: string;
  value: string;
};

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children' | 'size'> & {
  fullWidth?: boolean;
  options: SelectOptionType[];
  placeholder?: string;
  size?: SelectSizeType;
};
