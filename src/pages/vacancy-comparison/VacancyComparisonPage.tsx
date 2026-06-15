import { Suspense } from 'react';

import { SecondaryPageLayout } from '@components/layouts/secondary-page-layout';
import { Loader } from '@components/ui';

import { ResumePreview } from './common/lazyComponents';

import { VacancyComparison } from './components/vacancy-comparison';

export const VacancyComparisonPage = () => {
  return (
    <SecondaryPageLayout>
      <VacancyComparison />
      <Suspense fallback={<Loader label="Загрузка текста резюме" />}>
        <ResumePreview defaultTextExpanded />
      </Suspense>
    </SecondaryPageLayout>
  );
};
