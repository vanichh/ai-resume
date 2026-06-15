import type { ChangeEvent } from 'react';

import { Copy } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { useCopyToClipboardNotification } from '@common/hooks/useCopyToClipboardNotification';
import { Button, Textarea } from '@components/ui';
import { downloadCoverLetterText } from '@services/advice-export';
import { useResumeStore } from '@store/resumeStore';

import { selectCoverLetterGeneratorState } from './common/selectors';

import styles from './CoverLetterGenerator.module.scss';

export const CoverLetterGenerator = () => {
  const copyToClipboardWithNotification = useCopyToClipboardNotification();
  const { canGenerateCoverLetter, coverLetter, coverLetterStatus, generateCoverLetter, setCoverLetterText } =
    useResumeStore(useShallow(selectCoverLetterGeneratorState));

  const onGenerateClick = () => {
    void generateCoverLetter();
  };

  const onCoverLetterTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCoverLetterText(event.target.value);
  };

  const onCopyClick = () => {
    if (!coverLetter) {
      return;
    }

    void copyToClipboardWithNotification(coverLetter.text, 'Письмо скопировано.');
  };

  const onTextDownloadClick = () => {
    if (!coverLetter) {
      return;
    }

    downloadCoverLetterText(coverLetter.text);
  };

  return (
    <section className={styles.coverLetterGenerator}>
      <div className={styles.coverLetterGenerator__header}>
        <div>
          <h2 className={styles.coverLetterGenerator__title}>Сопроводительное письмо</h2>
          <p className={styles.coverLetterGenerator__subtitle}>Генерация под текущую роль, вакансию и анализ резюме.</p>
        </div>
        <Button disabled={!canGenerateCoverLetter} size="medium" onClick={onGenerateClick}>
          {coverLetterStatus === 'generating' ? 'Генерация...' : 'Сгенерировать'}
        </Button>
      </div>

      {coverLetter && (
        <>
          <Textarea
            className={styles.coverLetterGenerator__textarea}
            minHeight={260}
            value={coverLetter.text}
            onChange={onCoverLetterTextChange}
          />
          <div className={styles.coverLetterGenerator__actions}>
            <Button aria-label="Копировать сопроводительное письмо" size="small" onClick={onCopyClick}>
              <Copy aria-hidden size={16} />
            </Button>
            <Button size="small" onClick={onTextDownloadClick}>
              TXT
            </Button>
          </div>
        </>
      )}
    </section>
  );
};
