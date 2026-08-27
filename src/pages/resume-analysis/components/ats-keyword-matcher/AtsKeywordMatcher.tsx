import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { useAtsMatch } from '@common/hooks/useAtsMatch';

import styles from './AtsKeywordMatcher.module.scss';

export const AtsKeywordMatcher = () => {
  const { t } = useTranslation();
  const match = useAtsMatch();

  if (match.keywords.length === 0) {
    return null;
  }

  return (
    <section className={styles.root}>
      <h2 className={styles.root__title}>{t('analysis.atsKeywords.title')}</h2>
      <p className={styles.root__summary}>
        {t('analysis.atsKeywords.summary', {
          matchedCount: match.matchedCount,
          missingCount: match.missingCount,
          score: match.score,
        })}
      </p>
      <div className={styles.root__keywords}>
        {match.keywords.map((keyword) => (
          <span
            className={clsx(styles.root__keyword, {
              [styles.root__keyword_matched]: keyword.matched,
            })}
            key={keyword.keyword}
          >
            {keyword.keyword}
          </span>
        ))}
      </div>
    </section>
  );
};
