import { GitCompareArrows } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { CollapsibleBlock, EmptyState } from '@components/ui';

import type { RewriteComparisonListProps } from './types';

import styles from './RewriteComparisonList.module.scss';

export const RewriteComparisonList = ({ suggestions }: RewriteComparisonListProps) => {
  const { t } = useTranslation();

  return (
    <CollapsibleBlock className={styles.root} title={t('analysis.advice.rewriteComparison.title')}>
      {suggestions.length > 0 ? (
        <ul className={styles.root__list}>
          {suggestions.map((suggestion) => (
            <li className={styles.root__item} key={`${suggestion.original}-${suggestion.improved}`}>
              <div className={styles.root__columns}>
                <div className={styles.root__column}>
                  <span className={styles.root__label}>{t('analysis.advice.rewriteComparison.before')}</span>
                  <p className={styles.root__text}>{suggestion.original}</p>
                </div>
                <div className={styles.root__column}>
                  <span className={styles.root__label}>{t('analysis.advice.rewriteComparison.after')}</span>
                  <p className={styles.root__text}>{suggestion.improved}</p>
                </div>
              </div>
              <p className={styles.root__reason}>{suggestion.reason}</p>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          description={t('analysis.advice.rewriteComparison.emptyDescription')}
          icon={<GitCompareArrows aria-hidden size={18} />}
          title={t('analysis.advice.rewriteComparison.emptyTitle')}
        />
      )}
    </CollapsibleBlock>
  );
};
