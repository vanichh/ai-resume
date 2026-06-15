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
    <section className={styles.resumeComparisonView}>
      <h2 className={styles.resumeComparisonView__title}>Оригинал / перевод</h2>
      <div className={styles.resumeComparisonView__columns}>
        <div className={styles.resumeComparisonView__column}>
          <span className={styles.resumeComparisonView__label}>Оригинал</span>
          <pre className={styles.resumeComparisonView__text}>{resumeText}</pre>
        </div>
        <div className={styles.resumeComparisonView__column}>
          <span className={styles.resumeComparisonView__label}>Перевод</span>
          <pre className={styles.resumeComparisonView__text}>{translation.text}</pre>
        </div>
      </div>
    </section>
  );
};
