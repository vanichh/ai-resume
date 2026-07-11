/* eslint-disable css-modules/no-unused-class -- rule generates false BEM modifier combinations for clsx */
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { ANALYSIS_STAGES } from './common/constants';

import type { ResumeAnalysisProgressPropsType } from './types';

import styles from './ResumeAnalysisProgress.module.scss';

export const ResumeAnalysisProgress = ({ currentStage }: ResumeAnalysisProgressPropsType) => {
  const { t } = useTranslation();
  const currentStageIndex = ANALYSIS_STAGES.indexOf(currentStage);

  const getStageClassName = (index: number) => {
    if (index < currentStageIndex) {
      return styles.root__stage_completed;
    }

    return index === currentStageIndex ? styles.root__stage_active : undefined;
  };

  return (
    <div className={styles.root} role="status" aria-live="polite">
      <span className={styles.root__title}>{t('analysis.progress.title')}</span>
      <ol className={styles.root__stages}>
        {ANALYSIS_STAGES.map((stage, index) => (
          <li
            className={clsx(styles.root__stage, getStageClassName(index))}
            key={stage}
            aria-current={index === currentStageIndex ? 'step' : undefined}
          >
            {t(`analysis.progress.${stage}`)}
          </li>
        ))}
      </ol>
    </div>
  );
};
