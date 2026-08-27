import { Suspense } from 'react';

import { ResumeInputPanel } from '@components/resume-input-panel';
import { Loader } from '@components/ui';

import { AdviceView, AtsAuditReport, AtsKeywordMatcher, ResumePreview } from './common/lazyComponents';

import styles from './ResumeAnalysisPage.module.scss';

const loader = (
  <div className={styles.root__loader}>
    <Loader label="Загрузка рабочей области" />
  </div>
);

export const ResumeAnalysisPage = () => {
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
