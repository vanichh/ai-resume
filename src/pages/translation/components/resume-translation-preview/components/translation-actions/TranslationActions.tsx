import { Copy } from 'lucide-react';

import { useCopyToClipboardNotification } from '@common/hooks/useCopyToClipboardNotification';
import { Button } from '@components/ui';
import {
  downloadResumeDoc,
  downloadResumePrintHtml,
  downloadTranslationMarkdown,
  downloadTranslationText,
} from '@services/advice-export/adviceExport';

import type { TranslationActionsProps } from './types';

import styles from './TranslationActions.module.scss';

export const TranslationActions = ({ translation }: TranslationActionsProps) => {
  const copyToClipboardWithNotification = useCopyToClipboardNotification();

  const onCopyClick = () => {
    void copyToClipboardWithNotification(translation.text, 'Перевод скопирован.');
  };

  const onTextDownloadClick = () => {
    downloadTranslationText(translation);
  };

  const onMarkdownDownloadClick = () => {
    downloadTranslationMarkdown(translation);
  };

  const onDocDownloadClick = () => {
    downloadResumeDoc(translation.text, 'translated-resume.doc');
  };

  const onPrintHtmlDownloadClick = () => {
    downloadResumePrintHtml(translation.text, 'translated-resume-print.html');
  };

  return (
    <div className={styles.root}>
      <Button aria-label="Копировать перевод" size="small" onClick={onCopyClick}>
        <Copy aria-hidden size={16} />
      </Button>
      <Button size="small" onClick={onTextDownloadClick}>
        TXT
      </Button>
      <Button size="small" onClick={onMarkdownDownloadClick}>
        MD
      </Button>
      <Button size="small" onClick={onDocDownloadClick}>
        DOC
      </Button>
      <Button size="small" onClick={onPrintHtmlDownloadClick}>
        PDF HTML
      </Button>
    </div>
  );
};
