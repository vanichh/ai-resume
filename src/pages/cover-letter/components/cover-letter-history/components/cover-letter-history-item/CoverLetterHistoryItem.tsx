import { useState } from 'react';

import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, Modal } from '@components/ui';

import type { CoverLetterHistoryItemProps } from './types';

import styles from './CoverLetterHistoryItem.module.scss';

export const CoverLetterHistoryItem = ({ isActive, item, onRemove, onSelect }: CoverLetterHistoryItemProps) => {
  const { i18n, t } = useTranslation();
  const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] = useState(false);
  const createdAt = new Intl.DateTimeFormat(i18n.resolvedLanguage, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(item.createdAt));
  const title = item.companyName || item.targetRole || t('workspace.coverLetter.historyUntitled');
  const vacancy = item.vacancyText
    .split('\n')
    .find((line) => line.trim())
    ?.trim();

  const onSelectClick = () => {
    onSelect(item.id);
  };

  const onRemoveConfirmOpen = () => {
    setIsRemoveConfirmOpen(true);
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
      <Button
        className={styles.root__selectButton}
        variant={isActive ? 'primary' : 'secondary'}
        aria-current={isActive || undefined}
        onClick={onSelectClick}
      >
        <span className={styles.root__header}>
          <strong>{title}</strong>
          <span>{createdAt}</span>
        </span>
        <span className={styles.root__meta}>
          {item.targetRole || t('workspace.coverLetter.historyNoRole')} ·{' '}
          {t(`workspace.coverLetter.tones.${item.tone}`)} · {t(`workspace.coverLetter.lengths.${item.length}`)}
        </span>
        <span className={styles.root__meta}>
          {t(`workspace.coverLetter.companyTypes.${item.companyType}`)} ·{' '}
          {vacancy || t('workspace.coverLetter.historyNoVacancy')}
        </span>
        {item.sourceAnalysisId && (
          <span className={styles.root__source}>{t('workspace.coverLetter.historyLinkedAnalysis')}</span>
        )}
      </Button>
      <Button
        aria-label={t('workspace.coverLetter.historyRemoveAria')}
        className={styles.root__removeButton}
        size="small"
        onClick={onRemoveConfirmOpen}
      >
        <Trash2 aria-hidden size={16} />
      </Button>
      <Modal
        confirmLabel={t('common.delete')}
        description={t('workspace.coverLetter.historyRemoveDescription')}
        isOpen={isRemoveConfirmOpen}
        title={t('workspace.coverLetter.historyRemoveTitle')}
        onClose={onRemoveConfirmClose}
        onConfirm={onRemoveConfirm}
      />
    </li>
  );
};
