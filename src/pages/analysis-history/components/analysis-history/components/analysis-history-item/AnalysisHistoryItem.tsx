import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { Trash2 } from 'lucide-react';

import { Button, Modal, Textarea } from '@components/ui';

import { formatAnalysisHistoryDate } from './common/utils/formatAnalysisHistoryDate';

import type { AnalysisHistoryItemProps } from './types';

import styles from './AnalysisHistoryItem.module.scss';

export const AnalysisHistoryItem = ({ item, onNoteChange, onRemove, onSelect }: AnalysisHistoryItemProps) => {
  const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] = useState(false);
  const createdAt = formatAnalysisHistoryDate(item.createdAt);
  const title = item.targetRole || item.advice.targetRole || 'Без роли';

  const onSelectClick = () => {
    onSelect(item.id);
  };

  const onRemoveConfirmOpen = () => {
    setIsRemoveConfirmOpen(true);
  };

  const onNoteInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onNoteChange(item.id, event.target.value);
  };

  const onRemoveConfirmClose = () => {
    setIsRemoveConfirmOpen(false);
  };

  const onRemoveConfirm = () => {
    onRemove(item.id);
    setIsRemoveConfirmOpen(false);
  };

  return (
    <li className={styles.root}>
      <Button className={styles.root__selectButton} onClick={onSelectClick}>
        <span className={styles.root__header}>
          <strong>{title}</strong>
          <span>{item.advice.score}/100</span>
        </span>
        <span className={styles.root__meta}>{createdAt}</span>
        {item.fileName && <span className={styles.root__meta}>{item.fileName}</span>}
      </Button>
      <Button
        aria-label="Удалить анализ"
        className={styles.root__removeButton}
        size="small"
        onClick={onRemoveConfirmOpen}
      >
        <Trash2 aria-hidden size={16} />
      </Button>
      <Textarea
        className={styles.root__note}
        minHeight={72}
        placeholder="Заметка к анализу"
        value={item.note}
        onChange={onNoteInputChange}
      />
      <Modal
        confirmLabel="Удалить"
        description="Анализ будет удален из истории без возможности восстановления."
        isOpen={isRemoveConfirmOpen}
        title="Удалить анализ?"
        onClose={onRemoveConfirmClose}
        onConfirm={onRemoveConfirm}
      />
    </li>
  );
};
