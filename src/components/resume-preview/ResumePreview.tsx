import { copyToClipboard } from '@common/utils/copyToClipboard';

import { downloadResumeDoc, downloadResumePrintHtml } from '@services/advice-export/adviceExport';

import { useResumeStore } from '@store/resumeStore';

import styles from './ResumePreview.module.scss';

export function ResumePreview() {
  const resumeText = useResumeStore((state) => state.resumeText);
  const setResumeText = useResumeStore((state) => state.setResumeText);

  return (
    <div className={styles.resumePreview}>
      <div className={styles.resumePreview__header}>
        <h2 className={styles.resumePreview__title}>Текст резюме</h2>
        <div className={styles.resumePreview__actions}>
          <span>{resumeText.length.toLocaleString('ru-RU')} символов</span>
          <button
            className={styles.resumePreview__actionButton}
            type="button"
            disabled={!resumeText}
            onClick={() => void copyToClipboard(resumeText)}
          >
            Копировать
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
      <textarea
        className={styles.resumePreview__text}
        placeholder="После загрузки здесь появится извлеченный текст."
        value={resumeText}
        onChange={(event) => setResumeText(event.target.value)}
      />
    </div>
  );
}
