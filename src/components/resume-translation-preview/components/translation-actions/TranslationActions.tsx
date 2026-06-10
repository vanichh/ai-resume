import { copyToClipboard } from '@common/utils/copyToClipboard';

import {
  downloadResumeDoc,
  downloadResumePrintHtml,
  downloadTranslationMarkdown,
  downloadTranslationText,
} from '@services/advice-export/adviceExport';

import styles from './TranslationActions.module.scss';
import type { TranslationActionsProps } from './types';

export function TranslationActions({ translation }: TranslationActionsProps) {
  return (
    <div className={styles.translationActions}>
      <button
        className={styles.translationActions__button}
        type="button"
        onClick={() => void copyToClipboard(translation.text)}
      >
        Копировать
      </button>
      <button
        className={styles.translationActions__button}
        type="button"
        onClick={() => downloadTranslationText(translation)}
      >
        TXT
      </button>
      <button
        className={styles.translationActions__button}
        type="button"
        onClick={() => downloadTranslationMarkdown(translation)}
      >
        MD
      </button>
      <button
        className={styles.translationActions__button}
        type="button"
        onClick={() => downloadResumeDoc(translation.text, 'translated-resume.doc')}
      >
        DOC
      </button>
      <button
        className={styles.translationActions__button}
        type="button"
        onClick={() => downloadResumePrintHtml(translation.text, 'translated-resume-print.html')}
      >
        PDF HTML
      </button>
    </div>
  );
}
