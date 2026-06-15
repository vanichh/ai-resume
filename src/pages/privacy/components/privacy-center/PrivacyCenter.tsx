import { useState } from 'react';

import { Trash2 } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { getResumeWorkspaceStorageSize } from '@common/utils/resumeWorkspaceStorage';
import { Button, CollapsibleBlock, Modal } from '@components/ui';
import { useResumeStore } from '@store/resumeStore';

import { selectPrivacyCenterState } from './common/selectors';

import styles from './PrivacyCenter.module.scss';

const formatStorageSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  return `${(bytes / 1024).toFixed(1)} KB`;
};

export const PrivacyCenter = () => {
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const {
    analysisHistoryCount,
    clearWorkspace,
    comparisonVacanciesCount,
    coverLetter,
    resumeText,
    translationHistoryCount,
  } = useResumeStore(useShallow(selectPrivacyCenterState));
  const storageSize = formatStorageSize(getResumeWorkspaceStorageSize());

  const onClearConfirmOpen = () => {
    setIsClearConfirmOpen(true);
  };

  const onClearConfirmClose = () => {
    setIsClearConfirmOpen(false);
  };

  const onClearConfirm = () => {
    clearWorkspace();
    setIsClearConfirmOpen(false);
  };

  return (
    <>
      <CollapsibleBlock
        className={styles.privacyCenter}
        headerAction={
          <Button aria-label="Очистить все данные" size="small" onClick={onClearConfirmOpen}>
            <Trash2 aria-hidden size={16} />
          </Button>
        }
        title="Приватность"
      >
        <p className={styles.privacyCenter__subtitle}>Данные сохраняются только в локальном хранилище браузера.</p>
        <dl className={styles.privacyCenter__list}>
          <div className={styles.privacyCenter__item}>
            <dt>Текст резюме</dt>
            <dd>{resumeText ? 'сохранен' : 'не сохранен'}</dd>
          </div>
          <div className={styles.privacyCenter__item}>
            <dt>История анализов</dt>
            <dd>{analysisHistoryCount}</dd>
          </div>
          <div className={styles.privacyCenter__item}>
            <dt>Переводы</dt>
            <dd>{translationHistoryCount}</dd>
          </div>
          <div className={styles.privacyCenter__item}>
            <dt>Сравнения вакансий</dt>
            <dd>{comparisonVacanciesCount}</dd>
          </div>
          <div className={styles.privacyCenter__item}>
            <dt>Сопроводительное письмо</dt>
            <dd>{coverLetter ? 'сохранено' : 'не сохранено'}</dd>
          </div>
          <div className={styles.privacyCenter__item}>
            <dt>Размер данных</dt>
            <dd>{storageSize}</dd>
          </div>
        </dl>
      </CollapsibleBlock>
      <Modal
        confirmLabel="Очистить"
        description="Все локальные данные приложения будут удалены без возможности восстановления."
        isOpen={isClearConfirmOpen}
        title="Очистить все данные?"
        onClose={onClearConfirmClose}
        onConfirm={onClearConfirm}
      />
    </>
  );
};
