import type { ChangeEvent } from 'react';

import { Copy } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import { useCopyToClipboardNotification } from '@common/hooks/useCopyToClipboardNotification';
import { Button, EmptyState, Textarea } from '@components/ui';
import { downloadResumeDoc, downloadResumePrintHtml } from '@services/advice-export';
import { useResumeStore } from '@store/resumeStore';

import { selectCorrectedResumePreviewState } from './common/selectors';

import styles from './CorrectedResumePreview.module.scss';

export const CorrectedResumePreview = () => {
  const copyToClipboardWithNotification = useCopyToClipboardNotification();
  const {
    correctedResumeStatus,
    correctedResumeText,
    generateCorrectedResume,
    hasAdvice,
    hasResume,
    setCorrectedResumeText,
  } = useResumeStore(useShallow(selectCorrectedResumePreviewState));
  const canGenerate = hasAdvice && hasResume && correctedResumeStatus !== 'generating';

  const onGenerateClick = () => {
    void generateCorrectedResume();
  };

  const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCorrectedResumeText(event.target.value);
  };

  const onCopyClick = () => {
    void copyToClipboardWithNotification(correctedResumeText, 'Исправленное резюме скопировано.');
  };

  const onDocDownloadClick = () => {
    downloadResumeDoc(correctedResumeText, 'corrected-resume.doc');
  };

  const onPrintHtmlDownloadClick = () => {
    downloadResumePrintHtml(correctedResumeText, 'corrected-resume-print.html');
  };

  return (
    <section className={styles.root}>
      <div className={styles.root__header}>
        <div>
          <h1 className={styles.root__title}>Исправленное резюме</h1>
          <p className={styles.root__subtitle}>Проверьте результат, внесите финальные правки и скачайте документ.</p>
        </div>
        <Button
          disabled={!canGenerate}
          loading={correctedResumeStatus === 'generating'}
          variant="primary"
          onClick={onGenerateClick}
        >
          {correctedResumeStatus === 'generating'
            ? 'Создание...'
            : correctedResumeText
              ? 'Создать заново'
              : 'Создать резюме'}
        </Button>
      </div>

      {!hasAdvice ? (
        <EmptyState
          title="Сначала проанализируйте резюме"
          description="Исправленная версия создается на основе рекомендаций анализа."
        />
      ) : correctedResumeText ? (
        <>
          <Textarea
            className={styles.root__textarea}
            minHeight={520}
            value={correctedResumeText}
            onChange={onTextChange}
          />
          <div className={styles.root__actions}>
            <Button aria-label="Копировать исправленное резюме" size="small" onClick={onCopyClick}>
              <Copy aria-hidden size={16} />
            </Button>
            <Button size="small" onClick={onDocDownloadClick}>
              DOC
            </Button>
            <Button size="small" onClick={onPrintHtmlDownloadClick}>
              PDF HTML
            </Button>
          </div>
        </>
      ) : (
        <EmptyState
          title="Исправленная версия еще не создана"
          description="Факты и опыт останутся без изменений, улучшатся структура и формулировки."
        />
      )}
    </section>
  );
};
