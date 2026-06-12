import clsx from 'clsx';

import { CollapsibleBlock, EmptyState } from '@components/ui';

import type { AdviceBlockProps } from './types';

import styles from './AdviceBlock.module.scss';

export function AdviceBlock({
  title,
  values,
  defaultCollapsed = false,
  empty,
  headerAction,
  wide = false,
}: AdviceBlockProps) {
  return (
    <CollapsibleBlock
      className={clsx(styles.adviceBlock, {
        [styles.adviceBlock_wide]: wide,
      })}
      defaultCollapsed={defaultCollapsed}
      headerAction={headerAction}
      title={title}
    >
      {values.length > 0 ? (
        <ul className={styles.adviceBlock__list}>
          {values.map((value) => (
            <li className={styles.adviceBlock__item} key={value}>
              {value}
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState description={empty} title="Данных пока нет" />
      )}
    </CollapsibleBlock>
  );
}
