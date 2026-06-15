import { Suspense } from 'react';

import { SecondaryPageLayout } from '@components/layouts/secondary-page-layout';
import { Loader } from '@components/ui';

import { ResumePreview } from './common/lazyComponents';

import { CoverLetterGenerator } from './components/cover-letter-generator';

export const CoverLetterPage = () => {
  return (
    <SecondaryPageLayout>
      <CoverLetterGenerator />
      <Suspense fallback={<Loader label="Загрузка текста резюме" />}>
        <ResumePreview defaultTextExpanded />
      </Suspense>
    </SecondaryPageLayout>
  );
};
