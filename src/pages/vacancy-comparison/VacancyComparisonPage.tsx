import { Suspense } from 'react';

import { useTranslation } from 'react-i18next';

import { SecondaryPageLayout } from '@components/layouts/secondary-page-layout';
import { Loader } from '@components/ui';

import { ResumePreview } from './common/lazyComponents';

import { VacancyComparison } from './components/vacancy-comparison';

export const VacancyComparisonPage = () => {
  const { t } = useTranslation();

  return (
    <SecondaryPageLayout>
      <VacancyComparison />
      <Suspense fallback={<Loader label={t('workspace.comparison.pageLoading')} />}>
        <ResumePreview defaultTextExpanded />
      </Suspense>
    </SecondaryPageLayout>
  );
};
