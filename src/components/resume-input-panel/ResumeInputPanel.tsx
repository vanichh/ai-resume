import { useShallow } from 'zustand/react/shallow';

import { useResumeStore } from '@store/resumeStore';

import { STATUS_LABELS } from './common/constants';
import { selectResumeInputPanelState } from './common/selectors';
import { getSubmitButtonStatusClassName } from './common/utils/getSubmitButtonStatusClassName';

import { ExportActions } from './components/export-actions';
import { ResumeFileDropZone } from './components/resume-file-drop-zone';
import { ResumeInputHeader } from './components/resume-input-header';
import { TargetRoleField } from './components/target-role-field';
import { TranslationLanguageField } from './components/translation-language-field';
import { TranslationToneField } from './components/translation-tone-field';
import { UnsupportedModelActions } from './components/unsupported-model-actions';
import { VacancyField } from './components/vacancy-field';

import styles from './ResumeInputPanel.module.scss';

export const ResumeInputPanel = () => {
  const {
    advice,
    analyze,
    canAnalyze,
    canTranslate,
    fileName,
    modelStatus,
    parseFile,
    setTargetRole,
    setTranslationLanguage,
    setTranslationTone,
    setVacancyText,
    status,
    targetRole,
    translate,
    translationLanguage,
    translationTone,
    vacancyText,
  } = useResumeStore(useShallow(selectResumeInputPanelState));

  const onFileChange = (file: File) => {
    void parseFile(file);
  };

  const onAnalyzeClick = () => {
    void analyze();
  };

  const onTranslateClick = () => {
    void translate();
  };

  return (
    <div className={styles.resumeInput}>
      <ResumeInputHeader />
      <TargetRoleField targetRole={targetRole} onTargetRoleChange={setTargetRole} />
      <VacancyField vacancyText={vacancyText} onVacancyTextChange={setVacancyText} />
      <ResumeFileDropZone fileName={fileName} onFileChange={onFileChange} />
      <UnsupportedModelActions modelStatus={modelStatus} />
      <TranslationLanguageField language={translationLanguage} onLanguageChange={setTranslationLanguage} />
      <TranslationToneField tone={translationTone} onToneChange={setTranslationTone} />

      <button
        className={styles.resumeInput__primaryButton}
        disabled={!canAnalyze}
        type="button"
        onClick={onAnalyzeClick}
      >
        <span className={styles.resumeInput__primaryButtonText}>Получить рекомендации</span>
        <span className={getSubmitButtonStatusClassName(status)}>{STATUS_LABELS[status]}</span>
      </button>
      <button
        className={styles.resumeInput__secondaryButton}
        disabled={!canTranslate}
        type="button"
        onClick={onTranslateClick}
      >
        Перевести резюме
      </button>

      {advice && <ExportActions advice={advice} />}
    </div>
  );
};
