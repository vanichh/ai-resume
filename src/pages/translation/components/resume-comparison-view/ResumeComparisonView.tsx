import { useShallow } from 'zustand/react/shallow';

import { useResumeStore } from '@store/resumeStore';

import { selectResumeComparisonViewState } from './common/selectors';

import styles from './ResumeComparisonView.module.scss';

export const ResumeComparisonView = () => {
  const { resumeText, translation } = useResumeStore(useShallow(selectResumeComparisonViewState));

  if (!translation || !resumeText) {
    return null;
  }

  return (
    <section className={styles.root}>
      <h2 className={styles.root__title}>Оригинал / перевод</h2>
      <div className={styles.root__columns}>
        <div className={styles.root__column}>
          <span className={styles.root__label}>Оригинал</span>
          <pre className={styles.root__text}>{resumeText}</pre>
        </div>
        <div className={styles.root__column}>
          <span className={styles.root__label}>Перевод</span>
          <pre className={styles.root__text}>{translation.text}</pre>
        </div>
      </div>
    </section>
  );
};
