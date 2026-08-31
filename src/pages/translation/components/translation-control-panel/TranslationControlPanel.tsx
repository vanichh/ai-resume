import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

import { ResumeFileDropZone } from '@components/resume-input-panel/components/resume-file-drop-zone';
import { TranslationLanguageField } from '@components/resume-input-panel/components/translation-language-field';
import { TranslationToneField } from '@components/resume-input-panel/components/translation-tone-field';
import { UnsupportedModelActions } from '@components/resume-input-panel/components/unsupported-model-actions';
import { Button } from '@components/ui';
import { useResumeStore } from '@store/resumeStore';

import { selectTranslationControlPanelState } from './common/selectors';

import styles from './TranslationControlPanel.module.scss';

export const TranslationControlPanel = () => {
  const { t } = useTranslation();
  const {
    canTranslate,
    fileName,
    modelStatus,
    parseFile,
    setTranslationLanguage,
    setTranslationTone,
    status,
    translate,
    translationLanguage,
    translationTone,
  } = useResumeStore(useShallow(selectTranslationControlPanelState));

  const onFileChange = (file: File) => {
    void parseFile(file);
  };

  const onTranslateClick = () => {
    void translate();
  };

  const isTranslating = status === 'translating';

  return (
    <aside className={styles.root}>
      <div className={styles.root__header}>
        <h1 className={styles.root__title}>{t('workspace.translation.title')}</h1>
        <p className={styles.root__subtitle}>{t('workspace.translation.subtitle')}</p>
      </div>
      <ResumeFileDropZone fileName={fileName} onFileChange={onFileChange} />
      <UnsupportedModelActions modelStatus={modelStatus} />
      <TranslationLanguageField language={translationLanguage} onLanguageChange={setTranslationLanguage} />
      <TranslationToneField tone={translationTone} onToneChange={setTranslationTone} />
      <Button
        disabled={!canTranslate}
        fullWidth
        loading={isTranslating}
        size="large"
        variant="primary"
        onClick={onTranslateClick}
      >
        {isTranslating ? t('workspace.translation.translating') : t('workspace.translation.translate')}
      </Button>
    </aside>
  );
};
