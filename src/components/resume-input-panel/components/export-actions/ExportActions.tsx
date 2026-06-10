import { copyToClipboard } from '@common/utils/copyToClipboard';

import { downloadAdviceJson, downloadAdviceMarkdown } from '@services/advice-export';

import styles from './ExportActions.module.scss';
import type { ExportActionsProps } from './types';

export function ExportActions({ advice }: ExportActionsProps) {
  return (
    <>
      <p className={styles.exportActions__title}>Скачать рекомендации</p>
      <div className={styles.exportActions__row}>
        <button className={styles.exportActions__button} type="button" onClick={() => downloadAdviceMarkdown(advice)}>
          MD
        </button>
        <button className={styles.exportActions__button} type="button" onClick={() => downloadAdviceJson(advice)}>
          JSON
        </button>
        <button
          className={styles.exportActions__button}
          type="button"
          onClick={() => void copyToClipboard(JSON.stringify(advice, null, 2))}
        >
          Копировать
        </button>
      </div>
    </>
  );
}
