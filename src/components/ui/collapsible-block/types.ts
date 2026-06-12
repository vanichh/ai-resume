import type { ReactNode } from 'react';

export type CollapsibleBlockProps = {
  children: ReactNode;
  className?: string;
  defaultCollapsed?: boolean;
  headerAction?: ReactNode;
  title: string;
};
