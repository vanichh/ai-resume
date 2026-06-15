import { AnalysisHistory } from '@components/analysis-history';

import styles from './AnalysisHistoryPage.module.scss';

export const AnalysisHistoryPage = () => {
  return (
    <section className={styles.analysisHistoryPage}>
      <AnalysisHistory />
    </section>
  );
};
