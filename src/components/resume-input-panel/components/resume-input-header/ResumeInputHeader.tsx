import { useTranslation } from 'react-i18next';

import styles from './ResumeInputHeader.module.scss';

export const ResumeInputHeader = () => {
  const { t } = useTranslation();

  return (
    <header className={styles.root}>
      <div>
        <h1 className={styles.root__title}>{t('analysis.title')}</h1>
        <p className={styles.root__subtitle}>{t('analysis.subtitle')}</p>
      </div>
    </header>
  );
};
