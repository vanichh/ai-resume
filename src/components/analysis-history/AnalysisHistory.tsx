import { Button } from '@components/ui';

import { useResumeStore } from '@store/resumeStore';

import { AnalysisHistoryItem } from './components/analysis-history-item';

import styles from './AnalysisHistory.module.scss';

export function AnalysisHistory() {
  const clearAnalysisHistory = useResumeStore((state) => state.clearAnalysisHistory);
  const history = useResumeStore((state) => state.analysisHistory);
  const removeAnalysisHistoryItem = useResumeStore((state) => state.removeAnalysisHistoryItem);
  const selectAnalysisHistoryItem = useResumeStore((state) => state.selectAnalysisHistoryItem);

  if (history.length === 0) {
    return null;
  }

  return (
    <section className={styles.analysisHistory}>
      <div className={styles.analysisHistory__header}>
        <h2 className={styles.analysisHistory__title}>История анализов</h2>
        <Button size="small" onClick={clearAnalysisHistory}>
          Очистить
        </Button>
      </div>
      <ul className={styles.analysisHistory__list}>
        {history.map((item) => (
          <AnalysisHistoryItem
            item={item}
            key={item.id}
            onRemove={removeAnalysisHistoryItem}
            onSelect={selectAnalysisHistoryItem}
          />
        ))}
      </ul>
    </section>
  );
}
