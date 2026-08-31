import { Suspense } from 'react';

import { useTranslation } from 'react-i18next';

import { SecondaryPageLayout } from '@components/layouts/secondary-page-layout';
import { Loader } from '@components/ui';

import { ResumePreview } from './common/lazyComponents';

import { CoverLetterGenerator } from './components/cover-letter-generator';
import { CoverLetterHistory } from './components/cover-letter-history';

export const CoverLetterPage = () => {
  const { t } = useTranslation();

  return (
    <SecondaryPageLayout>
      <CoverLetterGenerator />
      <CoverLetterHistory />
      <Suspense fallback={<Loader label={t('workspace.coverLetter.pageLoading')} />}>
        <ResumePreview defaultTextExpanded />
      </Suspense>
    </SecondaryPageLayout>
  );
};
