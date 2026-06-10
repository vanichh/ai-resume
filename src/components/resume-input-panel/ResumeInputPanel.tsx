import { useResumeStore } from '@store/resumeStore';
import { selectCanAnalyze, selectCanTranslate } from '@store/selectors';

import { STATUS_LABELS } from './common/constants';
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

export function ResumeInputPanel() {
  const advice = useResumeStore((state) => state.advice);
  const analyze = useResumeStore((state) => state.analyze);
  const canAnalyze = useResumeStore(selectCanAnalyze);
  const canTranslate = useResumeStore(selectCanTranslate);
  const fileName = useResumeStore((state) => state.fileName);
  const modelStatus = useResumeStore((state) => state.modelStatus);
  const parseFile = useResumeStore((state) => state.parseFile);
  const setTargetRole = useResumeStore((state) => state.setTargetRole);
  const setTranslationLanguage = useResumeStore((state) => state.setTranslationLanguage);
  const setTranslationTone = useResumeStore((state) => state.setTranslationTone);
  const setVacancyText = useResumeStore((state) => state.setVacancyText);
  const status = useResumeStore((state) => state.status);
  const targetRole = useResumeStore((state) => state.targetRole);
  const translate = useResumeStore((state) => state.translate);
  const translationLanguage = useResumeStore((state) => state.translationLanguage);
  const translationTone = useResumeStore((state) => state.translationTone);
  const vacancyText = useResumeStore((state) => state.vacancyText);

  return (
    <div className={styles.resumeInput}>
      <ResumeInputHeader />
      <TargetRoleField targetRole={targetRole} onTargetRoleChange={setTargetRole} />
      <VacancyField vacancyText={vacancyText} onVacancyTextChange={setVacancyText} />
      <ResumeFileDropZone fileName={fileName} onFileChange={(file) => void parseFile(file)} />
      <UnsupportedModelActions modelStatus={modelStatus} />
      <TranslationLanguageField language={translationLanguage} onLanguageChange={setTranslationLanguage} />
      <TranslationToneField tone={translationTone} onToneChange={setTranslationTone} />

      <button
        className={styles.resumeInput__primaryButton}
        disabled={!canAnalyze}
        type="button"
        onClick={() => void analyze()}
      >
        <span className={styles.resumeInput__primaryButtonText}>Получить рекомендации</span>
        <span className={getSubmitButtonStatusClassName(status)}>{STATUS_LABELS[status]}</span>
      </button>
      <button
        className={styles.resumeInput__secondaryButton}
        disabled={!canTranslate}
        type="button"
        onClick={() => void translate()}
      >
        Перевести резюме
      </button>

      {advice && <ExportActions advice={advice} />}
    </div>
  );
}
