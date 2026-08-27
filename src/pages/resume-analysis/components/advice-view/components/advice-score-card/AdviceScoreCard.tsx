import { useTranslation } from 'react-i18next';

import type { AdviceScoreCardProps } from './types';

import styles from './AdviceScoreCard.module.scss';

export const AdviceScoreCard = ({ advice }: AdviceScoreCardProps) => {
  const { t } = useTranslation();

  return (
    <article className={styles.root}>
      <h2 className={styles.root__title}>{t('analysis.advice.score.title')}</h2>
      {advice ? (
        <>
          <strong className={styles.root__value}>{advice.score}/100</strong>
          <p className={styles.root__description}>{advice.targetRole}</p>
        </>
      ) : (
        <p className={styles.root__description}>{t('analysis.advice.score.empty')}</p>
      )}
    </article>
  );
};
