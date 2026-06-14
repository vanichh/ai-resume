import { useState } from 'react';

import { Clock3, Trash2 } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { Button, CollapsibleBlock, EmptyState, Modal } from '@components/ui';
import { useResumeStore } from '@store/resumeStore';

import { selectAnalysisHistoryState } from './common/selectors';

import { AnalysisHistoryItem } from './components/analysis-history-item';

import styles from './AnalysisHistory.module.scss';

export const AnalysisHistory = () => {
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const {
    clearAnalysisHistory,
    history,
    removeAnalysisHistoryItem,
    selectAnalysisHistoryItem,
    setAnalysisHistoryNote,
  } = useResumeStore(useShallow(selectAnalysisHistoryState));

  const onClearConfirmOpen = () => {
    setIsClearConfirmOpen(true);
  };

  const onClearConfirmClose = () => {
    setIsClearConfirmOpen(false);
  };

  const onClearConfirm = () => {
    clearAnalysisHistory();
    setIsClearConfirmOpen(false);
  };

  return (
    <>
      <CollapsibleBlock
        className={styles.analysisHistory}
        headerAction={
          history.length > 0 ? (
            <Button aria-label="Очистить историю анализа" size="small" onClick={onClearConfirmOpen}>
              <Trash2 aria-hidden size={16} />
            </Button>
          ) : null
        }
        title="История анализов"
      >
        {history.length > 0 ? (
          <ul className={styles.analysisHistory__list}>
            {history.map((item) => (
              <AnalysisHistoryItem
                item={item}
                key={item.id}
                onNoteChange={setAnalysisHistoryNote}
                onRemove={removeAnalysisHistoryItem}
                onSelect={selectAnalysisHistoryItem}
              />
            ))}
          </ul>
        ) : (
          <EmptyState
            description="После первого анализа здесь появятся сохраненные результаты и заметки."
            icon={<Clock3 aria-hidden size={18} />}
            title="История пока пустая"
          />
        )}
      </CollapsibleBlock>
      <Modal
        confirmLabel="Очистить"
        description="История анализов будет удалена без возможности восстановления."
        isOpen={isClearConfirmOpen}
        title="Очистить историю?"
        onClose={onClearConfirmClose}
        onConfirm={onClearConfirm}
      />
    </>
  );
};
