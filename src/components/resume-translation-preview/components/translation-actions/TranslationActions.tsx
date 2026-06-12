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

export function TranslationActions({ translation }: TranslationActionsProps) {
  const copyToClipboardWithNotification = useCopyToClipboardNotification();

  return (
    <div className={styles.translationActions}>
      <Button
        aria-label="Копировать перевод"
        size="small"
        onClick={() => void copyToClipboardWithNotification(translation.text, 'Перевод скопирован.')}
      >
        <Copy aria-hidden size={16} />
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
