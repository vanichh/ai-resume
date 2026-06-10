import { useAtsMatch } from '@common/hooks/useAtsMatch';

import styles from './AtsKeywordMatcher.module.scss';

export function AtsKeywordMatcher() {
  const match = useAtsMatch();

  if (match.keywords.length === 0) {
    return null;
  }

  return (
    <section className={styles.atsKeywordMatcher}>
      <h2 className={styles.atsKeywordMatcher__title}>Ключевые слова ATS</h2>
      <p className={styles.atsKeywordMatcher__summary}>
        {match.score}/100 · найдено {match.matchedCount} · не хватает {match.missingCount}
      </p>
      <div className={styles.atsKeywordMatcher__keywords}>
        {match.keywords.map((keyword) => {
          const keywordClassName = `${styles.atsKeywordMatcher__keyword} ${keyword.matched ? styles.atsKeywordMatcher__keyword_matched : ''}`;

          return (
            <span className={keywordClassName} key={keyword.keyword}>
              {keyword.keyword}
            </span>
          );
        })}
      </div>
    </section>
  );
}
