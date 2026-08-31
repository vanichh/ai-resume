import { useTranslation } from 'react-i18next';

import type { LoaderProps } from './types';

import styles from './Loader.module.scss';

export const Loader = ({ label }: LoaderProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.root} role="status">
      <span className={styles.root__spinner} aria-hidden="true" />
      <span className={styles.root__label}>{label ?? t('common.loading')}</span>
    </div>
  );
};
