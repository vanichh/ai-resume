import type { ChangeEvent } from 'react';

import { Copy } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

import {
  COVER_LETTER_COMPANY_OPTIONS,
  COVER_LETTER_LENGTH_OPTIONS,
  COVER_LETTER_TONE_OPTIONS,
} from '@common/constants';
import { useCopyToClipboardNotification } from '@common/hooks/useCopyToClipboardNotification';
import type {
  CoverLetterCompanyType,
  CoverLetterLengthType,
  CoverLetterToneType,
  CoverLetterVariantType,
} from '@common/types';
import { Button, Select, Textarea } from '@components/ui';
import { downloadCoverLetterText } from '@services/advice-export';
import { useResumeStore } from '@store/resumeStore';

import { COVER_LETTER_VARIANTS_COUNT_OPTIONS } from './common/constants';
import { selectCoverLetterGeneratorState } from './common/selectors';

import styles from './CoverLetterGenerator.module.scss';

export const CoverLetterGenerator = () => {
  const copyToClipboardWithNotification = useCopyToClipboardNotification();
  const {
    canGenerateCoverLetter,
    coverLetter,
    coverLetterCompanyType,
    coverLetterLength,
    coverLetterStatus,
    coverLetterTone,
    coverLetterVariantsCount,
    generateCoverLetter,
    setCoverLetterCompanyType,
    setCoverLetterLength,
    setCoverLetterText,
    setCoverLetterTone,
    setCoverLetterVariantsCount,
  } = useResumeStore(useShallow(selectCoverLetterGeneratorState));
  const coverLetterVariants = coverLetter?.variants ?? [];

  const onGenerateClick = () => {
    void generateCoverLetter();
  };

  const onToneChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCoverLetterTone(event.target.value as CoverLetterToneType);
  };

  const onLengthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCoverLetterLength(event.target.value as CoverLetterLengthType);
  };

  const onCompanyTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCoverLetterCompanyType(event.target.value as CoverLetterCompanyType);
  };

  const onVariantsCountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCoverLetterVariantsCount(Number(event.target.value));
  };

  const onCoverLetterTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCoverLetterText(event.target.value);
  };

  const onCopyClick = () => {
    if (!coverLetter) {
      return;
    }

    void copyToClipboardWithNotification(coverLetter.text, 'Письмо скопировано.');
  };

  const onTextDownloadClick = () => {
    if (!coverLetter) {
      return;
    }

    downloadCoverLetterText(coverLetter.text);
  };

  const renderCoverLetterVariant = ({ id, text, title }: CoverLetterVariantType) => {
    return (
      <article className={styles.coverLetterGenerator__variant} key={id}>
        <h3 className={styles.coverLetterGenerator__variantTitle}>{title}</h3>
        <p className={styles.coverLetterGenerator__variantText}>{text}</p>
      </article>
    );
  };

  return (
    <section className={styles.coverLetterGenerator}>
      <div className={styles.coverLetterGenerator__header}>
        <div>
          <h2 className={styles.coverLetterGenerator__title}>Сопроводительное письмо</h2>
          <p className={styles.coverLetterGenerator__subtitle}>Генерация под текущую роль, вакансию и анализ резюме.</p>
        </div>
        <Button disabled={!canGenerateCoverLetter} size="medium" onClick={onGenerateClick}>
          {coverLetterStatus === 'generating' ? 'Генерация...' : 'Сгенерировать'}
        </Button>
      </div>
      <div className={styles.coverLetterGenerator__settings}>
        <label className={styles.coverLetterGenerator__field}>
          <span className={styles.coverLetterGenerator__label}>Тон письма</span>
          <Select options={COVER_LETTER_TONE_OPTIONS} value={coverLetterTone} onChange={onToneChange} />
        </label>
        <label className={styles.coverLetterGenerator__field}>
          <span className={styles.coverLetterGenerator__label}>Длина письма</span>
          <Select options={COVER_LETTER_LENGTH_OPTIONS} value={coverLetterLength} onChange={onLengthChange} />
        </label>
        <label className={styles.coverLetterGenerator__field}>
          <span className={styles.coverLetterGenerator__label}>Тип компании</span>
          <Select
            options={COVER_LETTER_COMPANY_OPTIONS}
            value={coverLetterCompanyType}
            onChange={onCompanyTypeChange}
          />
        </label>
        <label className={styles.coverLetterGenerator__field}>
          <span className={styles.coverLetterGenerator__label}>Варианты</span>
          <Select
            options={COVER_LETTER_VARIANTS_COUNT_OPTIONS}
            value={String(coverLetterVariantsCount)}
            onChange={onVariantsCountChange}
          />
        </label>
      </div>

      {coverLetter && (
        <>
          {coverLetterVariants.length > 1 && (
            <div className={styles.coverLetterGenerator__variants}>
              {coverLetterVariants.map(renderCoverLetterVariant)}
            </div>
          )}
          <Textarea
            className={styles.coverLetterGenerator__textarea}
            minHeight={260}
            value={coverLetter.text}
            onChange={onCoverLetterTextChange}
          />
          <div className={styles.coverLetterGenerator__actions}>
            <Button aria-label="Копировать сопроводительное письмо" size="small" onClick={onCopyClick}>
              <Copy aria-hidden size={16} />
            </Button>
            <Button size="small" onClick={onTextDownloadClick}>
              TXT
            </Button>
          </div>
        </>
      )}
    </section>
  );
};
