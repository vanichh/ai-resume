import { useState } from 'react';

import { Trash2 } from 'lucide-react';

import { getResumeWorkspaceStorageSize } from '@common/utils/resumeWorkspaceStorage';

import { Button, CollapsibleBlock, Modal } from '@components/ui';

import { useResumeStore } from '@store/resumeStore';

import styles from './PrivacyCenter.module.scss';

function formatStorageSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  return `${(bytes / 1024).toFixed(1)} KB`;
}

export function PrivacyCenter() {
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const analysisHistoryCount = useResumeStore((state) => state.analysisHistory.length);
  const clearWorkspace = useResumeStore((state) => state.clearWorkspace);
  const comparisonVacanciesCount = useResumeStore((state) => state.comparisonVacancies.length);
  const coverLetter = useResumeStore((state) => state.coverLetter);
  const resumeText = useResumeStore((state) => state.resumeText);
  const translationHistoryCount = useResumeStore((state) => state.translationHistory.length);
  const storageSize = formatStorageSize(getResumeWorkspaceStorageSize());

  return (
    <>
      <CollapsibleBlock
        className={styles.privacyCenter}
        headerAction={
          <Button aria-label="Очистить все данные" size="small" onClick={() => setIsClearConfirmOpen(true)}>
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
        onClose={() => setIsClearConfirmOpen(false)}
        onConfirm={() => {
          clearWorkspace();
          setIsClearConfirmOpen(false);
        }}
      />
    </>
  );
}
