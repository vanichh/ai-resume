import type { ChangeEvent } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { Copy, Maximize2, Minimize2 } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { useCopyToClipboardNotification } from '@common/hooks/useCopyToClipboardNotification';
import { Button, CollapsibleBlock, Textarea } from '@components/ui';
import { downloadResumeDoc, downloadResumePrintHtml } from '@services/advice-export/adviceExport';
import { useResumeStore } from '@store/resumeStore';

import { selectResumePreviewState } from './common/selectors';

import styles from './ResumePreview.module.scss';

const COMPACT_TEXT_HEIGHT = 240;

export const ResumePreview = () => {
  const copyToClipboardWithNotification = useCopyToClipboardNotification();
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [expandedTextHeight, setExpandedTextHeight] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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

  const onTextExpandToggleClick = () => {
    setIsTextExpanded((currentValue) => !currentValue);
  };

  useLayoutEffect(() => {
    if (!isTextExpanded || !textareaRef.current) {
      setExpandedTextHeight(null);

      return;
    }

    setExpandedTextHeight(Math.max(textareaRef.current.scrollHeight, COMPACT_TEXT_HEIGHT));
  }, [isTextExpanded, resumeText]);

  return (
    <CollapsibleBlock
      className={styles.resumePreview}
      headerAction={
        <div className={styles.resumePreview__actions}>
          <span>{resumeText.length.toLocaleString('ru-RU')} символов</span>
          <Button
            aria-label={isTextExpanded ? 'Свернуть текст резюме' : 'Раскрыть текст резюме полностью'}
            aria-pressed={isTextExpanded}
            size="small"
            onClick={onTextExpandToggleClick}
          >
            {isTextExpanded ? <Minimize2 aria-hidden size={16} /> : <Maximize2 aria-hidden size={16} />}
          </Button>
          <Button aria-label="Копировать резюме" disabled={!resumeText} size="small" onClick={onCopyClick}>
            <Copy aria-hidden size={16} />
          </Button>
          <Button disabled={!resumeText} size="small" onClick={onDocDownloadClick}>
            DOC
          </Button>
          <Button disabled={!resumeText} size="small" onClick={onPrintHtmlDownloadClick}>
            PDF HTML
          </Button>
        </div>
      }
      title="Текст резюме"
    >
      <Textarea
        className={clsx(styles.resumePreview__text, {
          [styles.resumePreview__text_expanded]: isTextExpanded,
        })}
        placeholder="После загрузки здесь появится извлеченный текст."
        ref={textareaRef}
        style={isTextExpanded && expandedTextHeight ? { height: expandedTextHeight } : undefined}
        variant="code"
        value={resumeText}
        onChange={onResumeTextChange}
      />
    </CollapsibleBlock>
  );
};
