import type { LoaderProps } from './types';

import styles from './Loader.module.scss';

export const Loader = ({ label = 'Загрузка' }: LoaderProps) => {
  return (
    <div className={styles.root} role="status">
      <span className={styles.root__spinner} aria-hidden="true" />
      <span className={styles.root__label}>{label}</span>
    </div>
  );
};
