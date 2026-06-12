import { Copy } from 'lucide-react';

import { useCopyToClipboardNotification } from '@common/hooks/useCopyToClipboardNotification';

import { Button } from '@components/ui';

import { downloadAdviceJson, downloadAdviceMarkdown, downloadAdviceReportHtml } from '@services/advice-export';

import type { ExportActionsProps } from './types';

import styles from './ExportActions.module.scss';

export function ExportActions({ advice }: ExportActionsProps) {
  const copyToClipboardWithNotification = useCopyToClipboardNotification();

  return (
    <>
      <p className={styles.exportActions__title}>Скачать рекомендации</p>
      <div className={styles.exportActions__row}>
        <Button fullWidth size="large" onClick={() => downloadAdviceMarkdown(advice)}>
          MD
        </Button>
        <Button fullWidth size="large" onClick={() => downloadAdviceJson(advice)}>
          JSON
        </Button>
        <Button fullWidth size="large" onClick={() => downloadAdviceReportHtml(advice)}>
          PDF HTML
        </Button>
        <Button
          aria-label="Копировать рекомендации"
          fullWidth
          size="large"
          onClick={() =>
            void copyToClipboardWithNotification(JSON.stringify(advice, null, 2), 'Рекомендации скопированы.')
          }
        >
          <Copy aria-hidden size={18} />
        </Button>
      </div>
    </>
  );
}
