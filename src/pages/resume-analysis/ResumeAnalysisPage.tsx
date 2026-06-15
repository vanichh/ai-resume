import { Suspense } from 'react';

import { ResumeInputPanel } from '@components/resume-input-panel';
import { Loader } from '@components/ui';

import { AdviceView, AtsKeywordMatcher, ResumePreview } from './common/lazyComponents';

import styles from './ResumeAnalysisPage.module.scss';

export const ResumeAnalysisPage = () => {
  return (
    <section className={styles.resumeAnalysisPage}>
      <ResumeInputPanel />
      <div className={styles.resumeAnalysisPage__content}>
        <Suspense
          fallback={
            <div className={styles.resumeAnalysisPage__loader}>
              <Loader label="Загрузка рабочей области" />
            </div>
          }
        >
          <ResumePreview />
          <AtsKeywordMatcher />
          <AdviceView />
        </Suspense>
      </div>
    </section>
  );
};
