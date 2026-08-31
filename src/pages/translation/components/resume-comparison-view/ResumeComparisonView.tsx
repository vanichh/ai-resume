import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

import { useResumeStore } from '@store/resumeStore';

import { selectResumeComparisonViewState } from './common/selectors';

import styles from './ResumeComparisonView.module.scss';

export const ResumeComparisonView = () => {
  const { t } = useTranslation();
  const { resumeText, translation } = useResumeStore(useShallow(selectResumeComparisonViewState));

  if (!translation || !resumeText) {
    return null;
  }

  return (
    <section className={styles.root}>
      <h2 className={styles.root__title}>{t('workspace.translation.comparisonTitle')}</h2>
      <div className={styles.root__columns}>
        <div className={styles.root__column}>
          <span className={styles.root__label}>{t('workspace.translation.original')}</span>
          <pre className={styles.root__text}>{resumeText}</pre>
        </div>
        <div className={styles.root__column}>
          <span className={styles.root__label}>{t('workspace.translation.translated')}</span>
          <pre className={styles.root__text}>{translation.text}</pre>
        </div>
      </div>
    </section>
  );
};
