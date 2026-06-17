import clsx from 'clsx';

import { useAtsMatch } from '@common/hooks/useAtsMatch';

import styles from './AtsKeywordMatcher.module.scss';

export const AtsKeywordMatcher = () => {
  const match = useAtsMatch();

  if (match.keywords.length === 0) {
    return null;
  }

  return (
    <section className={styles.root}>
      <h2 className={styles.root__title}>Ключевые слова ATS</h2>
      <p className={styles.root__summary}>
        {match.score}/100 · найдено {match.matchedCount} · не хватает {match.missingCount}
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
