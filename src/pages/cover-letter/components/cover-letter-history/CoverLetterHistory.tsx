import { History } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

import { CollapsibleBlock, EmptyState } from '@components/ui';
import { useResumeStore } from '@store/resumeStore';

import { selectCoverLetterHistoryState } from './common/selectors';

import { CoverLetterHistoryItem } from './components/cover-letter-history-item';

import styles from './CoverLetterHistory.module.scss';

export const CoverLetterHistory = () => {
  const { t } = useTranslation();
  const { activeId, history, removeCoverLetter, selectCoverLetter } = useResumeStore(
    useShallow(selectCoverLetterHistoryState),
  );

  return (
    <CollapsibleBlock className={styles.root} title={t('workspace.coverLetter.historyTitle')}>
      {history.length > 0 ? (
        <ul className={styles.root__list}>
          {history.map((item) => (
            <CoverLetterHistoryItem
              isActive={item.id === activeId}
              item={item}
              key={item.id}
              onRemove={removeCoverLetter}
              onSelect={selectCoverLetter}
            />
          ))}
        </ul>
      ) : (
        <EmptyState
          description={t('workspace.coverLetter.historyEmptyDescription')}
          icon={<History aria-hidden size={18} />}
          title={t('workspace.coverLetter.historyEmptyTitle')}
        />
      )}
    </CollapsibleBlock>
  );
};
