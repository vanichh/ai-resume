import { copyToClipboard } from '@common/utils/copyToClipboard';

import { Button } from '@components/ui';

import { downloadAdviceJson, downloadAdviceMarkdown, downloadAdviceReportHtml } from '@services/advice-export';

import styles from './ExportActions.module.scss';
import type { ExportActionsProps } from './types';

export function ExportActions({ advice }: ExportActionsProps) {
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
        <Button fullWidth size="large" onClick={() => void copyToClipboard(JSON.stringify(advice, null, 2))}>
          Копировать
        </Button>
      </div>
    </>
  );
}
