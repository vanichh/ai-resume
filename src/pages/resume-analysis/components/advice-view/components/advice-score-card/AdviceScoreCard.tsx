import type { AdviceScoreCardProps } from './types';

import styles from './AdviceScoreCard.module.scss';

export const AdviceScoreCard = ({ advice }: AdviceScoreCardProps) => {
  return (
    <article className={styles.adviceScoreCard}>
      <h2 className={styles.adviceScoreCard__title}>Оценка</h2>
      {advice ? (
        <>
          <strong className={styles.adviceScoreCard__value}>{advice.score}/100</strong>
          <p className={styles.adviceScoreCard__description}>{advice.targetRole}</p>
        </>
      ) : (
        <p className={styles.adviceScoreCard__description}>Оценка появится после анализа.</p>
      )}
    </article>
  );
};
