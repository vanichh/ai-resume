import { useState } from 'react';

import { Trash2 } from 'lucide-react';

import { Button, Modal } from '@components/ui';

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

  if (history.length === 0) {
    return null;
  }

  return (
    <section className={styles.analysisHistory}>
      <div className={styles.analysisHistory__header}>
        <h2 className={styles.analysisHistory__title}>История анализов</h2>
        <Button aria-label="Очистить историю анализа" size="small" onClick={() => setIsClearConfirmOpen(true)}>
          <Trash2 aria-hidden size={16} />
        </Button>
      </div>
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
    </section>
  );
}
