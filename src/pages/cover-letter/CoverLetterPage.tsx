import { CoverLetterGenerator } from '@components/cover-letter-generator';
import { ResumePreview } from '@components/resume-preview';

import styles from './CoverLetterPage.module.scss';

export const CoverLetterPage = () => {
  return (
    <section className={styles.coverLetterPage}>
      <CoverLetterGenerator />
      <ResumePreview />
    </section>
  );
};
