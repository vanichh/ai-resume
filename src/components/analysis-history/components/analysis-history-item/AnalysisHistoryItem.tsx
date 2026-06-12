import { useState } from 'react';

import { Trash2 } from 'lucide-react';

import { Button, Modal, Textarea } from '@components/ui';

import type { AnalysisHistoryItemProps } from './types';

import styles from '../../AnalysisHistory.module.scss';

export function AnalysisHistoryItem({ item, onNoteChange, onRemove, onSelect }: AnalysisHistoryItemProps) {
  const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] = useState(false);
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
      <Button
        aria-label="Удалить анализ"
        className={styles.analysisHistory__removeButton}
        size="small"
        onClick={() => setIsRemoveConfirmOpen(true)}
      >
        <Trash2 aria-hidden size={16} />
      </Button>
      <Textarea
        className={styles.analysisHistory__note}
        minHeight={72}
        placeholder="Заметка к анализу"
        value={item.note}
        onChange={(event) => onNoteChange(item.id, event.target.value)}
      />
      <Modal
        confirmLabel="Удалить"
        description="Анализ будет удален из истории без возможности восстановления."
        isOpen={isRemoveConfirmOpen}
        title="Удалить анализ?"
        onClose={() => setIsRemoveConfirmOpen(false)}
        onConfirm={() => {
          onRemove(item.id);
          setIsRemoveConfirmOpen(false);
        }}
      />
    </li>
  );
}
