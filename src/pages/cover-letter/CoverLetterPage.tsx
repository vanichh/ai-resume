import { CoverLetterGenerator } from '@components/cover-letter-generator';
import { ResumePreview } from '@components/resume-preview';
import { SecondaryPageLayout } from '@components/secondary-page-layout';

export const CoverLetterPage = () => {
  return (
    <SecondaryPageLayout>
      <CoverLetterGenerator />
      <ResumePreview defaultTextExpanded />
    </SecondaryPageLayout>
  );
};
