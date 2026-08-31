import { useState } from 'react';

import { Clock3, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

import { Button, CollapsibleBlock, EmptyState, Modal } from '@components/ui';
import { useResumeStore } from '@store/resumeStore';

import { selectAnalysisHistoryState } from './common/selectors';

import { AnalysisHistoryItem } from './components/analysis-history-item';

import styles from './AnalysisHistory.module.scss';

export const AnalysisHistory = () => {
  const { t } = useTranslation();
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
        className={styles.root}
        headerAction={
          history.length > 0 ? (
            <Button aria-label={t('workspace.history.clearAria')} size="small" onClick={onClearConfirmOpen}>
              <Trash2 aria-hidden size={16} />
            </Button>
          ) : null
        }
        title={t('workspace.history.title')}
      >
        {history.length > 0 ? (
          <ul className={styles.root__list}>
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
            description={t('workspace.history.emptyDescription')}
            icon={<Clock3 aria-hidden size={18} />}
            title={t('workspace.history.emptyTitle')}
          />
        )}
      </CollapsibleBlock>
      <Modal
        confirmLabel={t('common.clear')}
        description={t('workspace.history.clearDescription')}
        isOpen={isClearConfirmOpen}
        title={t('workspace.history.clearTitle')}
        onClose={onClearConfirmClose}
        onConfirm={onClearConfirm}
      />
    </>
  );
};
