import { Inbox } from 'lucide-react';

import type { EmptyStateProps } from './types';

import styles from './EmptyState.module.scss';

export const EmptyState = ({ description, icon = <Inbox aria-hidden size={18} />, title }: EmptyStateProps) => {
  return (
    <div className={styles.root}>
      <span className={styles.root__icon}>{icon}</span>
      <div className={styles.root__content}>
        <p className={styles.root__title}>{title}</p>
        <p className={styles.root__description}>{description}</p>
      </div>
    </div>
  );
};
