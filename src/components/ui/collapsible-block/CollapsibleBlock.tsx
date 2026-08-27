import { useId, useState } from 'react';

import clsx from 'clsx';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const contentId = useId();

  const onToggleClick = () => {
    setIsCollapsed((currentValue) => !currentValue);
  };

  return (
    <article className={clsx(styles.root, className)}>
      <header className={styles.root__header}>
        <h2 className={styles.root__title}>{title}</h2>
        <div className={styles.root__actions}>
          {headerAction}
          <Button
            aria-label={t(isCollapsed ? 'common.expandBlock' : 'common.collapseBlock')}
            aria-controls={contentId}
            aria-expanded={!isCollapsed}
            className={styles.root__toggle}
            size="small"
            onClick={onToggleClick}
          >
            {isCollapsed ? <ChevronDown aria-hidden size={18} /> : <ChevronUp aria-hidden size={18} />}
          </Button>
        </div>
      </header>
      {!isCollapsed && (
        <div className={styles.root__content} id={contentId}>
          {children}
        </div>
      )}
    </article>
  );
};
