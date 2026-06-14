import { Copy } from 'lucide-react';

import { useCopyToClipboardNotification } from '@common/hooks/useCopyToClipboardNotification';
import { Button } from '@components/ui';
import { downloadAdviceJson, downloadAdviceMarkdown, downloadAdviceReportHtml } from '@services/advice-export';

import type { ExportActionsProps } from './types';

import styles from './ExportActions.module.scss';

export const ExportActions = ({ advice }: ExportActionsProps) => {
  const copyToClipboardWithNotification = useCopyToClipboardNotification();

  const onMarkdownDownloadClick = () => {
    downloadAdviceMarkdown(advice);
  };

  const onJsonDownloadClick = () => {
    downloadAdviceJson(advice);
  };

  const onReportHtmlDownloadClick = () => {
    downloadAdviceReportHtml(advice);
  };

  const onCopyClick = () => {
    void copyToClipboardWithNotification(JSON.stringify(advice, null, 2), 'Рекомендации скопированы.');
  };

  return (
    <>
      <p className={styles.exportActions__title}>Скачать рекомендации</p>
      <div className={styles.exportActions__row}>
        <Button fullWidth size="large" onClick={onMarkdownDownloadClick}>
          MD
        </Button>
        <Button fullWidth size="large" onClick={onJsonDownloadClick}>
          JSON
        </Button>
        <Button fullWidth size="large" onClick={onReportHtmlDownloadClick}>
          PDF HTML
        </Button>
        <Button aria-label="Копировать рекомендации" fullWidth size="large" onClick={onCopyClick}>
          <Copy aria-hidden size={18} />
        </Button>
      </div>
    </>
  );
};
