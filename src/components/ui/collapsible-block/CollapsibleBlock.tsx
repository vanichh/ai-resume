import { useId, useState } from 'react';

import clsx from 'clsx';
import { ChevronDown, ChevronUp } from 'lucide-react';

import type { CollapsibleBlockProps } from './types';

import { Button } from '../button';

import styles from './CollapsibleBlock.module.scss';

export const CollapsibleBlock = ({
  children,
  className = '',
  defaultCollapsed = false,
  headerAction,
  title,
}: CollapsibleBlockProps) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const contentId = useId();

  const onToggleClick = () => {
    setIsCollapsed((currentValue) => !currentValue);
  };

  return (
    <article className={clsx(styles.collapsibleBlock, className)}>
      <header className={styles.collapsibleBlock__header}>
        <h2 className={styles.collapsibleBlock__title}>{title}</h2>
        <div className={styles.collapsibleBlock__actions}>
          {headerAction}
          <Button
            aria-label={isCollapsed ? 'Развернуть блок' : 'Свернуть блок'}
            aria-controls={contentId}
            aria-expanded={!isCollapsed}
            className={styles.collapsibleBlock__toggle}
            size="small"
            onClick={onToggleClick}
          >
            {isCollapsed ? <ChevronDown aria-hidden size={18} /> : <ChevronUp aria-hidden size={18} />}
          </Button>
        </div>
      </header>
      {!isCollapsed && (
        <div className={styles.collapsibleBlock__content} id={contentId}>
          {children}
        </div>
      )}
    </article>
  );
};
