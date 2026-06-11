import type { LoaderProps } from './types';

import styles from './Loader.module.scss';

export function Loader({ label = 'Загрузка' }: LoaderProps) {
  return (
    <div className={styles.loader} role="status">
      <span className={styles.loader__spinner} aria-hidden="true" />
      <span className={styles.loader__label}>{label}</span>
    </div>
  );
}
