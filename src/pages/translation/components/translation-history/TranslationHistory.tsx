import { Languages } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { RESUME_TRANSLATION_LANGUAGE_LABELS, RESUME_TRANSLATION_TONE_LABELS } from '@common/constants';
import { Button, CollapsibleBlock, EmptyState } from '@components/ui';
import { useResumeStore } from '@store/resumeStore';

import { selectTranslationHistoryState } from './common/selectors';

import styles from './TranslationHistory.module.scss';

export const TranslationHistory = () => {
  const { activeId, history, selectTranslation } = useResumeStore(useShallow(selectTranslationHistoryState));

  return (
    <CollapsibleBlock className={styles.root} title="История переводов">
      {history.length > 0 ? (
        <ul className={styles.root__list}>
          {history.map((translation) => (
            <li key={translation.id}>
              <Button
                size="medium"
                variant={translation.id === activeId ? 'primary' : 'secondary'}
                onClick={() => selectTranslation(translation.id)}
              >
                {RESUME_TRANSLATION_LANGUAGE_LABELS[translation.language]} ·{' '}
                {RESUME_TRANSLATION_TONE_LABELS[translation.tone]}
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          description="Переведите резюме, чтобы быстро возвращаться к предыдущим версиям."
          icon={<Languages aria-hidden size={18} />}
          title="Переводов пока нет"
        />
      )}
    </CollapsibleBlock>
  );
};
