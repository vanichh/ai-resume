import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { Trash2 } from 'lucide-react';

import { Button, Modal, Textarea } from '@components/ui';

import type { VacancyComparisonItemProps } from './types';

import { VACANCY_COMPARISON_STATUS_LABELS } from '../../common/constants';

import styles from './VacancyComparisonItem.module.scss';

export const VacancyComparisonItem = ({
  item,
  onRemove,
  onSelect,
  onTextChange,
  onTitleChange,
}: VacancyComparisonItemProps) => {
  const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] = useState(false);
  const canSelectResult = Boolean(item.advice);

  const onTitleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onTitleChange(item.id, event.target.value);
  };

  const onRemoveConfirmOpen = () => {
    setIsRemoveConfirmOpen(true);
  };

  const onTextInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(item.id, event.target.value);
  };

  const onSelectClick = () => {
    onSelect(item.id);
  };

  const onRemoveConfirmClose = () => {
    setIsRemoveConfirmOpen(false);
  };

  const onRemoveConfirm = () => {
    onRemove(item.id);
    setIsRemoveConfirmOpen(false);
  };

  return (
    <article className={styles.root}>
      <div className={styles.root__header}>
        <input
          className={styles.root__titleInput}
          placeholder="Название вакансии"
          type="text"
          value={item.title}
          onChange={onTitleInputChange}
        />
        <Button aria-label="Удалить вакансию" size="medium" onClick={onRemoveConfirmOpen}>
          <Trash2 aria-hidden size={16} />
        </Button>
      </div>
      <Textarea
        className={styles.root__textarea}
        minHeight={130}
        placeholder="Вставьте текст вакансии"
        value={item.vacancyText}
        onChange={onTextInputChange}
      />
      <div className={styles.root__result}>
        <span className={styles.root__status}>{VACANCY_COMPARISON_STATUS_LABELS[item.status]}</span>
        {item.advice && (
          <>
            <strong className={styles.root__score}>{item.advice.score}/100</strong>
            <p className={styles.root__summary}>{item.advice.summary}</p>
            {item.advice.missingKeywords.length > 0 && (
              <p className={styles.root__keywords}>
                Нет ключевых слов: {item.advice.missingKeywords.slice(0, 6).join(', ')}
              </p>
            )}
            <Button
              className={styles.root__selectButton}
              disabled={!canSelectResult}
              size="medium"
              onClick={onSelectClick}
            >
              Открыть результат
            </Button>
          </>
        )}
        {item.error && <p className={styles.root__error}>{item.error}</p>}
      </div>
      <Modal
        confirmLabel="Удалить"
        description="Вакансия и результат сравнения будут удалены без возможности восстановления."
        isOpen={isRemoveConfirmOpen}
        title="Удалить вакансию?"
        onClose={onRemoveConfirmClose}
        onConfirm={onRemoveConfirm}
      />
    </article>
  );
};
