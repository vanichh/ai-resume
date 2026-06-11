import { Suspense } from 'react';

import { ResumeInputPanel } from '@components/resume-input-panel';
import { Loader } from '@components/ui';

import { useAppBootstrap } from './common/hooks/useAppBootstrap';
import {
  AdviceView,
  AnalysisHistory,
  AtsKeywordMatcher,
  CoverLetterGenerator,
  PrivacyCenter,
  ResumeComparisonView,
  ResumePreview,
  ResumeTranslationPreview,
  TranslationHistory,
  VacancyComparison,
} from './common/lazyComponents';

import { AppToast } from './components/app-toast';

import styles from './App.module.scss';

export function App() {
  useAppBootstrap();

  return (
    <main className={styles.app}>
      <section className={styles.app__workspace}>
        <ResumeInputPanel />
        <div className={styles.app__content}>
          <Suspense
            fallback={
              <div className={styles.app__loader}>
                <Loader label="Загрузка рабочей области" />
              </div>
            }
          >
            <ResumePreview />
            <PrivacyCenter />
            <AnalysisHistory />
            <VacancyComparison />
            <CoverLetterGenerator />
            <ResumeTranslationPreview />
            <TranslationHistory />
            <ResumeComparisonView />
            <AtsKeywordMatcher />
            <AdviceView />
          </Suspense>
        </div>
      </section>
      <AppToast />
    </main>
  );
}
