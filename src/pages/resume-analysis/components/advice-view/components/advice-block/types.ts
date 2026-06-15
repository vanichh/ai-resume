import type { ReactNode } from 'react';

export type AdviceBlockProps = {
  title: string;
  values: string[];
  defaultCollapsed?: boolean;
  empty: string;
  headerAction?: ReactNode;
  wide?: boolean;
};
