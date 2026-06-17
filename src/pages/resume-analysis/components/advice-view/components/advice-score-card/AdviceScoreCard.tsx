import type { AdviceScoreCardProps } from './types';

import styles from './AdviceScoreCard.module.scss';

export const AdviceScoreCard = ({ advice }: AdviceScoreCardProps) => {
  return (
    <article className={styles.root}>
      <h2 className={styles.root__title}>Оценка</h2>
      {advice ? (
        <>
          <strong className={styles.root__value}>{advice.score}/100</strong>
          <p className={styles.root__description}>{advice.targetRole}</p>
        </>
      ) : (
        <p className={styles.root__description}>Оценка появится после анализа.</p>
      )}
    </article>
  );
};
