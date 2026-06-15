import { ResumePreview } from '@components/resume-preview';
import { VacancyComparison } from '@components/vacancy-comparison';

import styles from './VacancyComparisonPage.module.scss';

export const VacancyComparisonPage = () => {
  return (
    <section className={styles.vacancyComparisonPage}>
      <VacancyComparison />
      <ResumePreview />
    </section>
  );
};
