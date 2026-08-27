import { Suspense } from 'react';

import { useTranslation } from 'react-i18next';

import { ResumeInputPanel } from '@components/resume-input-panel';
import { Loader } from '@components/ui';

import { AdviceView, AtsAuditReport, AtsKeywordMatcher, ResumePreview } from './common/lazyComponents';

import styles from './ResumeAnalysisPage.module.scss';

export const ResumeAnalysisPage = () => {
  const { t } = useTranslation();
  const loader = (
    <div className={styles.root__loader}>
      <Loader label={t('analysis.workspaceLoading')} />
    </div>
  );

  return (
    <section className={styles.root}>
      <ResumeInputPanel />
      <div className={styles.root__content}>
        <Suspense fallback={loader}>
          <ResumePreview />
          <AtsAuditReport />
          <AtsKeywordMatcher />
          <AdviceView />
        </Suspense>
      </div>
    </section>
  );
};
