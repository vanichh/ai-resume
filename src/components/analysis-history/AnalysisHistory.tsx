import { useState } from 'react';

import { Clock3, Trash2 } from 'lucide-react';

import { Button, CollapsibleBlock, EmptyState, Modal } from '@components/ui';

import { useResumeStore } from '@store/resumeStore';

import { AnalysisHistoryItem } from './components/analysis-history-item';

import styles from './AnalysisHistory.module.scss';

export function AnalysisHistory() {
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const clearAnalysisHistory = useResumeStore((state) => state.clearAnalysisHistory);
  const history = useResumeStore((state) => state.analysisHistory);
  const removeAnalysisHistoryItem = useResumeStore((state) => state.removeAnalysisHistoryItem);
  const selectAnalysisHistoryItem = useResumeStore((state) => state.selectAnalysisHistoryItem);
  const setAnalysisHistoryNote = useResumeStore((state) => state.setAnalysisHistoryNote);

  return (
    <>
      <CollapsibleBlock
        className={styles.analysisHistory}
        headerAction={
          history.length > 0 ? (
            <Button aria-label="Очистить историю анализа" size="small" onClick={() => setIsClearConfirmOpen(true)}>
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
        onClose={() => setIsClearConfirmOpen(false)}
        onConfirm={() => {
          clearAnalysisHistory();
          setIsClearConfirmOpen(false);
        }}
      />
    </>
  );
}
