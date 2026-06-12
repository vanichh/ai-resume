import { GitCompareArrows } from 'lucide-react';

import { CollapsibleBlock, EmptyState } from '@components/ui';

import type { RewriteComparisonListProps } from './types';

import styles from './RewriteComparisonList.module.scss';

export function RewriteComparisonList({ suggestions }: RewriteComparisonListProps) {
  return (
    <CollapsibleBlock className={styles.rewriteComparisonList} title="До / после">
      {suggestions.length > 0 ? (
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
      ) : (
        <EmptyState
          description="После анализа здесь появятся точечные переписывания формулировок."
          icon={<GitCompareArrows aria-hidden size={18} />}
          title="Сравнений пока нет"
        />
      )}
    </CollapsibleBlock>
  );
}
