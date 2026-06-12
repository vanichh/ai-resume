import { Copy } from 'lucide-react';

import { useCopyToClipboardNotification } from '@common/hooks/useCopyToClipboardNotification';

import { Button, Textarea } from '@components/ui';

import { downloadCoverLetterText } from '@services/advice-export';

import { useResumeStore } from '@store/resumeStore';
import { selectCanGenerateCoverLetter } from '@store/selectors';

import styles from './CoverLetterGenerator.module.scss';

export function CoverLetterGenerator() {
  const copyToClipboardWithNotification = useCopyToClipboardNotification();
  const canGenerateCoverLetter = useResumeStore(selectCanGenerateCoverLetter);
  const coverLetter = useResumeStore((state) => state.coverLetter);
  const coverLetterStatus = useResumeStore((state) => state.coverLetterStatus);
  const generateCoverLetter = useResumeStore((state) => state.generateCoverLetter);
  const setCoverLetterText = useResumeStore((state) => state.setCoverLetterText);

  return (
    <section className={styles.coverLetterGenerator}>
      <div className={styles.coverLetterGenerator__header}>
        <div>
          <h2 className={styles.coverLetterGenerator__title}>Сопроводительное письмо</h2>
          <p className={styles.coverLetterGenerator__subtitle}>Генерация под текущую роль, вакансию и анализ резюме.</p>
        </div>
        <Button disabled={!canGenerateCoverLetter} size="medium" onClick={() => void generateCoverLetter()}>
          {coverLetterStatus === 'generating' ? 'Генерация...' : 'Сгенерировать'}
        </Button>
      </div>

      {coverLetter && (
        <>
          <Textarea
            className={styles.coverLetterGenerator__textarea}
            minHeight={260}
            value={coverLetter.text}
            onChange={(event) => setCoverLetterText(event.target.value)}
          />
          <div className={styles.coverLetterGenerator__actions}>
            <Button
              aria-label="Копировать сопроводительное письмо"
              size="small"
              onClick={() => void copyToClipboardWithNotification(coverLetter.text, 'Письмо скопировано.')}
            >
              <Copy aria-hidden size={16} />
            </Button>
            <Button size="small" onClick={() => downloadCoverLetterText(coverLetter.text)}>
              TXT
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
