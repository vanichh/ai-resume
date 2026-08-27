import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { CollapsibleBlock, EmptyState } from '@components/ui';

import type { AdviceBlockProps } from './types';

import styles from './AdviceBlock.module.scss';

export const AdviceBlock = ({
  title,
  values,
  defaultCollapsed = false,
  empty,
  headerAction,
  wide = false,
}: AdviceBlockProps) => {
  const { t } = useTranslation();

  return (
    <CollapsibleBlock
      className={clsx(styles.root, {
        [styles.root_wide]: wide,
      })}
      defaultCollapsed={defaultCollapsed}
      headerAction={headerAction}
      title={title}
    >
      {values.length > 0 ? (
        <ul className={styles.root__list}>
          {values.map((value) => (
            <li className={styles.root__item} key={value}>
              {value}
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState description={empty} title={t('analysis.advice.emptyTitle')} />
      )}
    </CollapsibleBlock>
  );
};
