import { Copy } from 'lucide-react';

import { useCopyToClipboardNotification } from '@common/hooks/useCopyToClipboardNotification';

import { Textarea } from '@components/ui';

import { downloadResumeDoc, downloadResumePrintHtml } from '@services/advice-export/adviceExport';

import { useResumeStore } from '@store/resumeStore';

import styles from './ResumePreview.module.scss';

export function ResumePreview() {
  const copyToClipboardWithNotification = useCopyToClipboardNotification();
  const resumeText = useResumeStore((state) => state.resumeText);
  const setResumeText = useResumeStore((state) => state.setResumeText);

  return (
    <div className={styles.resumePreview}>
      <div className={styles.resumePreview__header}>
        <h2 className={styles.resumePreview__title}>Текст резюме</h2>
        <div className={styles.resumePreview__actions}>
          <span>{resumeText.length.toLocaleString('ru-RU')} символов</span>
          <button
            aria-label="Копировать резюме"
            className={styles.resumePreview__actionButton}
            type="button"
            disabled={!resumeText}
            onClick={() => void copyToClipboardWithNotification(resumeText, 'Резюме скопировано.')}
          >
            <Copy aria-hidden size={16} />
          </button>
          <button
            className={styles.resumePreview__actionButton}
            type="button"
            disabled={!resumeText}
            onClick={() => downloadResumeDoc(resumeText)}
          >
            DOC
          </button>
          <button
            className={styles.resumePreview__actionButton}
            type="button"
            disabled={!resumeText}
            onClick={() => downloadResumePrintHtml(resumeText)}
          >
            PDF HTML
          </button>
        </div>
      </div>
      <Textarea
        className={styles.resumePreview__text}
        minHeight={380}
        placeholder="После загрузки здесь появится извлеченный текст."
        variant="code"
        value={resumeText}
        onChange={(event) => setResumeText(event.target.value)}
      />
    </div>
  );
}
