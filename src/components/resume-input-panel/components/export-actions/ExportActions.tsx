import { Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useCopyToClipboardNotification } from '@common/hooks/useCopyToClipboardNotification';
import { Button } from '@components/ui';
import { downloadAdviceJson, downloadAdviceMarkdown, downloadAdviceReportHtml } from '@services/advice-export';

import type { ExportActionsProps } from './types';

import styles from './ExportActions.module.scss';

export const ExportActions = ({ advice }: ExportActionsProps) => {
  const { t } = useTranslation();
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
    void copyToClipboardWithNotification(JSON.stringify(advice, null, 2), t('analysis.export.copied'));
  };

  return (
    <>
      <p className={styles.root__title}>{t('analysis.export.title')}</p>
      <div className={styles.root__row}>
        <Button fullWidth size="large" onClick={onMarkdownDownloadClick}>
          MD
        </Button>
        <Button fullWidth size="large" onClick={onJsonDownloadClick}>
          JSON
        </Button>
        <Button fullWidth size="large" onClick={onReportHtmlDownloadClick}>
          PDF HTML
        </Button>
        <Button aria-label={t('analysis.export.copy')} fullWidth size="large" onClick={onCopyClick}>
          <Copy aria-hidden size={18} />
        </Button>
      </div>
    </>
  );
};
