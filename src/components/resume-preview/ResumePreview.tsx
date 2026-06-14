import type { ChangeEvent } from 'react';

import { Copy } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { useCopyToClipboardNotification } from '@common/hooks/useCopyToClipboardNotification';
import { CollapsibleBlock, Textarea } from '@components/ui';
import { downloadResumeDoc, downloadResumePrintHtml } from '@services/advice-export/adviceExport';
import { useResumeStore } from '@store/resumeStore';

import { selectResumePreviewState } from './common/selectors';

import styles from './ResumePreview.module.scss';

export const ResumePreview = () => {
  const copyToClipboardWithNotification = useCopyToClipboardNotification();
  const { resumeText, setResumeText } = useResumeStore(useShallow(selectResumePreviewState));

  const onCopyClick = () => {
    void copyToClipboardWithNotification(resumeText, 'Резюме скопировано.');
  };

  const onDocDownloadClick = () => {
    downloadResumeDoc(resumeText);
  };

  const onPrintHtmlDownloadClick = () => {
    downloadResumePrintHtml(resumeText);
  };

  const onResumeTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(event.target.value);
  };

  return (
    <CollapsibleBlock
      className={styles.resumePreview}
      headerAction={
        <div className={styles.resumePreview__actions}>
          <span>{resumeText.length.toLocaleString('ru-RU')} символов</span>
          <button
            aria-label="Копировать резюме"
            className={styles.resumePreview__actionButton}
            type="button"
            disabled={!resumeText}
            onClick={onCopyClick}
          >
            <Copy aria-hidden size={16} />
          </button>
          <button
            className={styles.resumePreview__actionButton}
            type="button"
            disabled={!resumeText}
            onClick={onDocDownloadClick}
          >
            DOC
          </button>
          <button
            className={styles.resumePreview__actionButton}
            type="button"
            disabled={!resumeText}
            onClick={onPrintHtmlDownloadClick}
          >
            PDF HTML
          </button>
        </div>
      }
      title="Текст резюме"
    >
      <Textarea
        className={styles.resumePreview__text}
        minHeight={380}
        placeholder="После загрузки здесь появится извлеченный текст."
        variant="code"
        value={resumeText}
        onChange={onResumeTextChange}
      />
    </CollapsibleBlock>
  );
};
