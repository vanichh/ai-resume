import styles from './RewriteComparisonList.module.scss';
import type { RewriteComparisonListProps } from './types';

export function RewriteComparisonList({ suggestions }: RewriteComparisonListProps) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <article className={styles.rewriteComparisonList}>
      <h2 className={styles.rewriteComparisonList__title}>До / после</h2>
      <ul className={styles.rewriteComparisonList__list}>
        {suggestions.map((suggestion) => (
          <li className={styles.rewriteComparisonList__item} key={`${suggestion.original}-${suggestion.improved}`}>
            <div className={styles.rewriteComparisonList__columns}>
              <div className={styles.rewriteComparisonList__column}>
                <span className={styles.rewriteComparisonList__label}>До</span>
                <p className={styles.rewriteComparisonList__text}>{suggestion.original}</p>
              </div>
              <div className={styles.rewriteComparisonList__column}>
                <span className={styles.rewriteComparisonList__label}>После</span>
                <p className={styles.rewriteComparisonList__text}>{suggestion.improved}</p>
              </div>
            </div>
            <p className={styles.rewriteComparisonList__reason}>{suggestion.reason}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
