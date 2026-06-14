import { BarChart3 } from 'lucide-react';

import { getResumeSectionTitle } from '@common/utils/getResumeSectionTitle';
import { CollapsibleBlock, EmptyState } from '@components/ui';

import type { SectionScoreListProps } from './types';

import styles from './SectionScoreList.module.scss';

export const SectionScoreList = ({ scores }: SectionScoreListProps) => {
  return (
    <CollapsibleBlock className={styles.sectionScoreList} title="Оценка по секциям">
      {scores.length > 0 ? (
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
      ) : (
        <EmptyState
          description="После анализа здесь появятся оценки по ключевым разделам резюме."
          icon={<BarChart3 aria-hidden size={18} />}
          title="Секции еще не оценены"
        />
      )}
    </CollapsibleBlock>
  );
};
