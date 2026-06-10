import { useResumeStore } from '@store/resumeStore';

import styles from './ResumeComparisonView.module.scss';

export function ResumeComparisonView() {
  const resumeText = useResumeStore((state) => state.resumeText);
  const translation = useResumeStore((state) => state.translation);

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
}
