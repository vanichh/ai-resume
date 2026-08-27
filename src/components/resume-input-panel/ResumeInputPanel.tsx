import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

import type { AppStatusType } from '@common/types';
import { Button } from '@components/ui';
import { useResumeStore } from '@store/resumeStore';

import { selectResumeInputPanelState } from './common/selectors';

import { ExportActions } from './components/export-actions';
import { ResumeAnalysisProgress } from './components/resume-analysis-progress';
import { ResumeFileDropZone } from './components/resume-file-drop-zone';
import { ResumeInputHeader } from './components/resume-input-header';
import { TargetRoleField } from './components/target-role-field';
import { UnsupportedModelActions } from './components/unsupported-model-actions';
import { VacancyField } from './components/vacancy-field';

import styles from './ResumeInputPanel.module.scss';

const STATUS_CLASS_NAMES: Record<AppStatusType, string> = {
  analyzing: styles.root__primaryButtonStatus_analyzing,
  done: styles.root__primaryButtonStatus_done,
  error: styles.root__primaryButtonStatus_error,
  idle: '',
  parsing: styles.root__primaryButtonStatus_parsing,
  ready: styles.root__primaryButtonStatus_ready,
  translating: styles.root__primaryButtonStatus_translating,
};

export const ResumeInputPanel = () => {
  const { t } = useTranslation();
  const {
    advice,
    analysisStage,
    analyze,
    canAnalyze,
    cancelAnalysis,
    fileName,
    modelStatus,
    parseFile,
    setTargetRole,
    setVacancyText,
    status,
    targetRole,
    vacancyText,
  } = useResumeStore(useShallow(selectResumeInputPanelState));

  const onFileChange = (file: File) => {
    void parseFile(file);
  };

  const onAnalyzeClick = () => {
    if (status === 'analyzing') {
      cancelAnalysis();
      return;
    }

    void analyze();
  };

  const isAnalyzing = status === 'analyzing';
  const analysisActionKey = status === 'error' ? 'analysis.retryAction' : 'analysis.action';

  return (
    <div className={styles.root}>
      <ResumeInputHeader />
      <TargetRoleField targetRole={targetRole} onTargetRoleChange={setTargetRole} />
      <VacancyField vacancyText={vacancyText} onVacancyTextChange={setVacancyText} />
      <ResumeFileDropZone fileName={fileName} onFileChange={onFileChange} />
      <UnsupportedModelActions modelStatus={modelStatus} />

      <Button
        className={styles.root__primaryButton}
        disabled={!canAnalyze && !isAnalyzing}
        fullWidth
        size="large"
        variant="primary"
        onClick={onAnalyzeClick}
      >
        <span className={styles.root__primaryButtonText}>
          {t(isAnalyzing ? 'analysis.cancelAction' : analysisActionKey)}
        </span>
        <span className={clsx(styles.root__primaryButtonStatus, STATUS_CLASS_NAMES[status])}>
          {t(`analysis.status.${status}`)}
        </span>
      </Button>

      {isAnalyzing && analysisStage && <ResumeAnalysisProgress currentStage={analysisStage} />}

      {advice && <ExportActions advice={advice} />}
    </div>
  );
};
