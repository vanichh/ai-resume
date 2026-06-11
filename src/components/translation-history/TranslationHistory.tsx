import { RESUME_TRANSLATION_LANGUAGE_LABELS, RESUME_TRANSLATION_TONE_LABELS } from '@common/constants';

import { Button } from '@components/ui';

import { useResumeStore } from '@store/resumeStore';

import styles from './TranslationHistory.module.scss';

export function TranslationHistory() {
  const activeId = useResumeStore((state) => state.translation?.id);
  const history = useResumeStore((state) => state.translationHistory);
  const selectTranslation = useResumeStore((state) => state.selectTranslation);

  if (history.length === 0) {
    return null;
  }

  return (
    <section className={styles.translationHistory}>
      <h2 className={styles.translationHistory__title}>История переводов</h2>
      <ul className={styles.translationHistory__list}>
        {history.map((translation) => {
          return (
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
          );
        })}
      </ul>
    </section>
  );
}
