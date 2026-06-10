import { copyToClipboard } from '@common/utils/copyToClipboard';

import { Button } from '@components/ui';

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
      <Button size="small" onClick={() => void copyToClipboard(translation.text)}>
        Копировать
      </Button>
      <Button size="small" onClick={() => downloadTranslationText(translation)}>
        TXT
      </Button>
      <Button size="small" onClick={() => downloadTranslationMarkdown(translation)}>
        MD
      </Button>
      <Button size="small" onClick={() => downloadResumeDoc(translation.text, 'translated-resume.doc')}>
        DOC
      </Button>
      <Button size="small" onClick={() => downloadResumePrintHtml(translation.text, 'translated-resume-print.html')}>
        PDF HTML
      </Button>
    </div>
  );
}
