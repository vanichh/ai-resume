import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

import { Button, CollapsibleBlock, EmptyState } from '@components/ui';
import { useResumeStore } from '@store/resumeStore';

import { selectTranslationHistoryState } from './common/selectors';

import styles from './TranslationHistory.module.scss';

export const TranslationHistory = () => {
  const { t } = useTranslation();
  const { activeId, history, selectTranslation } = useResumeStore(useShallow(selectTranslationHistoryState));

  return (
    <CollapsibleBlock className={styles.root} title={t('workspace.translation.historyTitle')}>
      {history.length > 0 ? (
        <ul className={styles.root__list}>
          {history.map((translation) => (
            <li key={translation.id}>
              <Button
                size="medium"
                variant={translation.id === activeId ? 'primary' : 'secondary'}
                onClick={() => selectTranslation(translation.id)}
              >
                {t(`workspace.translation.languages.${translation.language}`)} ·{' '}
                {t(`workspace.translation.tones.${translation.tone}`)}
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          description={t('workspace.translation.historyEmptyDescription')}
          icon={<Languages aria-hidden size={18} />}
          title={t('workspace.translation.historyEmptyTitle')}
        />
      )}
    </CollapsibleBlock>
  );
};
