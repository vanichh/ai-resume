import type { AdviceScoreCardProps } from './types';

import styles from '../../AdviceView.module.scss';

export const AdviceScoreCard = ({ advice }: AdviceScoreCardProps) => {
  return (
    <article className={styles.adviceView__scoreCard}>
      <h2 className={styles.adviceView__scoreTitle}>Оценка</h2>
      {advice ? (
        <>
          <strong className={styles.adviceView__scoreValue}>{advice.score}/100</strong>
          <p className={styles.adviceView__scoreDescription}>{advice.targetRole}</p>
        </>
      ) : (
        <p className={styles.adviceView__scoreDescription}>Оценка появится после анализа.</p>
      )}
    </article>
  );
};
