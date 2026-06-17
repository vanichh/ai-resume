import clsx from 'clsx';

import type { SecondaryPageLayoutProps } from './types';

import styles from './SecondaryPageLayout.module.scss';

export const SecondaryPageLayout = ({ children, className }: SecondaryPageLayoutProps) => {
  return <section className={clsx(styles.root, className)}>{children}</section>;
};
