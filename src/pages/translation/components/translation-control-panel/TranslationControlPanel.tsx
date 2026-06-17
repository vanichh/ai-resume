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
  const {
    canTranslate,
    fileName,
    modelStatus,
    parseFile,
    setTranslationLanguage,
    setTranslationTone,
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

  return (
    <aside className={styles.root}>
      <div className={styles.root__header}>
        <h1 className={styles.root__title}>Перевод резюме</h1>
        <p className={styles.root__subtitle}>
          Загрузите резюме и выберите язык, тон и формат перевода для ATS и рекрутеров.
        </p>
      </div>
      <ResumeFileDropZone fileName={fileName} onFileChange={onFileChange} />
      <UnsupportedModelActions modelStatus={modelStatus} />
      <TranslationLanguageField language={translationLanguage} onLanguageChange={setTranslationLanguage} />
      <TranslationToneField tone={translationTone} onToneChange={setTranslationTone} />
      <Button disabled={!canTranslate} fullWidth size="large" variant="primary" onClick={onTranslateClick}>
        Перевести резюме
      </Button>
    </aside>
  );
};
