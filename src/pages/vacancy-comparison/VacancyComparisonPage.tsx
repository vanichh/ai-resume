import { ResumePreview } from '@components/resume-preview';
import { SecondaryPageLayout } from '@components/secondary-page-layout';
import { VacancyComparison } from '@components/vacancy-comparison';

export const VacancyComparisonPage = () => {
  return (
    <SecondaryPageLayout>
      <VacancyComparison />
      <ResumePreview defaultTextExpanded />
    </SecondaryPageLayout>
  );
};
