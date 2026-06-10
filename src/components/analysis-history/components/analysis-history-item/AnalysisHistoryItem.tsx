import { Button } from '@components/ui';

import type { AnalysisHistoryItemProps } from './types';

import styles from '../../AnalysisHistory.module.scss';

export function AnalysisHistoryItem({ item, onRemove, onSelect }: AnalysisHistoryItemProps) {
  const createdAt = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
  }).format(new Date(item.createdAt));
  const title = item.targetRole || item.advice.targetRole || 'Без роли';

  return (
    <li className={styles.analysisHistory__item}>
      <button className={styles.analysisHistory__selectButton} type="button" onClick={() => onSelect(item.id)}>
        <span className={styles.analysisHistory__itemHeader}>
          <strong>{title}</strong>
          <span>{item.advice.score}/100</span>
        </span>
        <span className={styles.analysisHistory__meta}>{createdAt}</span>
        {item.fileName && <span className={styles.analysisHistory__meta}>{item.fileName}</span>}
      </button>
      <Button className={styles.analysisHistory__removeButton} size="small" onClick={() => onRemove(item.id)}>
        Удалить
      </Button>
    </li>
  );
}
