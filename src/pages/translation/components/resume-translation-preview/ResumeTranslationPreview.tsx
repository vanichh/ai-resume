import type { ChangeEvent } from 'react';

import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

import { Textarea } from '@components/ui';
import { useResumeStore } from '@store/resumeStore';

import { selectResumeTranslationPreviewState } from './common/selectors';

import { TranslationActions } from './components/translation-actions';

import styles from './ResumeTranslationPreview.module.scss';

export const ResumeTranslationPreview = () => {
  const { t } = useTranslation();
  const { setTranslationText, translation } = useResumeStore(useShallow(selectResumeTranslationPreviewState));

  const onTranslationTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTranslationText(event.target.value);
  };

  if (!translation) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.root__header}>
        <h2 className={styles.root__title}>{t('workspace.translation.title')}</h2>
        <div className={styles.root__meta}>
          <span>{t(`workspace.translation.languages.${translation.language}`)}</span>
          <TranslationActions translation={translation} />
        </div>
      </div>
      <Textarea
        className={styles.root__text}
        minHeight={300}
        variant="code"
        value={translation.text}
        onChange={onTranslationTextChange}
      />
    </div>
  );
};
