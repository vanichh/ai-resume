import { GitCompareArrows } from 'lucide-react';

import { CollapsibleBlock, EmptyState } from '@components/ui';

import type { RewriteComparisonListProps } from './types';

import styles from './RewriteComparisonList.module.scss';

export const RewriteComparisonList = ({ suggestions }: RewriteComparisonListProps) => {
  return (
    <CollapsibleBlock className={styles.root} title="До / после">
      {suggestions.length > 0 ? (
        <ul className={styles.root__list}>
          {suggestions.map((suggestion) => (
            <li className={styles.root__item} key={`${suggestion.original}-${suggestion.improved}`}>
              <div className={styles.root__columns}>
                <div className={styles.root__column}>
                  <span className={styles.root__label}>До</span>
                  <p className={styles.root__text}>{suggestion.original}</p>
                </div>
                <div className={styles.root__column}>
                  <span className={styles.root__label}>После</span>
                  <p className={styles.root__text}>{suggestion.improved}</p>
                </div>
              </div>
              <p className={styles.root__reason}>{suggestion.reason}</p>
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
};
