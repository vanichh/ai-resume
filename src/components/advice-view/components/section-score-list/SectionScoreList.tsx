import { getResumeSectionTitle } from '@common/utils/getResumeSectionTitle';

import styles from './SectionScoreList.module.scss';
import type { SectionScoreListProps } from './types';

export function SectionScoreList({ scores }: SectionScoreListProps) {
  if (scores.length === 0) {
    return null;
  }

  return (
    <article className={styles.sectionScoreList}>
      <h2 className={styles.sectionScoreList__title}>Оценка по секциям</h2>
      <ul className={styles.sectionScoreList__list}>
        {scores.map((score) => (
          <li className={styles.sectionScoreList__item} key={score.title}>
            <div className={styles.sectionScoreList__header}>
              <span className={styles.sectionScoreList__name}>{getResumeSectionTitle(score.title)}</span>
              <strong className={styles.sectionScoreList__value}>{score.score}/100</strong>
            </div>
            <div className={styles.sectionScoreList__track} aria-hidden="true">
              <span className={styles.sectionScoreList__bar} style={{ width: `${score.score}%` }} />
            </div>
            <p className={styles.sectionScoreList__comment}>{score.comment}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
