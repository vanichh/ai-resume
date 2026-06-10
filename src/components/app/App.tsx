import { AdviceView } from '@components/advice-view';
import { AnalysisHistory } from '@components/analysis-history';
import { AtsKeywordMatcher } from '@components/ats-keyword-matcher';
import { ResumeComparisonView } from '@components/resume-comparison-view';
import { ResumeInputPanel } from '@components/resume-input-panel';
import { ResumePreview } from '@components/resume-preview';
import { ResumeTranslationPreview } from '@components/resume-translation-preview';
import { ScoreBreakdown } from '@components/score-breakdown';
import { TranslationHistory } from '@components/translation-history';
import { VacancyComparison } from '@components/vacancy-comparison';

import { useAppBootstrap } from './common/hooks/useAppBootstrap';

import { AppToast } from './components/app-toast';

import styles from './App.module.scss';

export function App() {
  useAppBootstrap();

  return (
    <main className={styles.app}>
      <section className={styles.app__workspace}>
        <ResumeInputPanel />
        <div className={styles.app__content}>
          <ResumePreview />
          <AnalysisHistory />
          <VacancyComparison />
          <ResumeTranslationPreview />
          <TranslationHistory />
          <ResumeComparisonView />
          <AtsKeywordMatcher />
          <ScoreBreakdown />
          <AdviceView />
        </div>
      </section>
      <AppToast />
    </main>
  );
}
