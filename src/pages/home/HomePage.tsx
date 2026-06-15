import { Suspense } from 'react';

import { ResumeInputPanel } from '@components/resume-input-panel';
import { Loader } from '@components/ui';

import { AdviceView, AtsKeywordMatcher, ResumePreview } from './common/lazyComponents';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <section className={styles.homePage}>
      <ResumeInputPanel />
      <div className={styles.homePage__content}>
        <Suspense
          fallback={
            <div className={styles.homePage__loader}>
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
