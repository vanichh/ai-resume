import { Inbox } from 'lucide-react';

import type { EmptyStateProps } from './types';

import styles from './EmptyState.module.scss';

export function EmptyState({ description, icon = <Inbox aria-hidden size={18} />, title }: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <span className={styles.emptyState__icon}>{icon}</span>
      <div className={styles.emptyState__content}>
        <p className={styles.emptyState__title}>{title}</p>
        <p className={styles.emptyState__description}>{description}</p>
      </div>
    </div>
  );
}
