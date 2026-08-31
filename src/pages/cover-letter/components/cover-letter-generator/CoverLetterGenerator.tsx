import type { ChangeEvent } from 'react';

import { Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const copyToClipboardWithNotification = useCopyToClipboardNotification();
  const {
    canGenerateCoverLetter,
    coverLetter,
    coverLetterCompanyName,
    coverLetterCompanyType,
    coverLetterLength,
    coverLetterStatus,
    coverLetterTone,
    coverLetterVariantsCount,
    generateCoverLetter,
    setCoverLetterCompanyName,
    setCoverLetterCompanyType,
    setCoverLetterLength,
    setCoverLetterText,
    setCoverLetterTone,
    setCoverLetterVariantsCount,
  } = useResumeStore(useShallow(selectCoverLetterGeneratorState));
  const coverLetterVariants = coverLetter?.variants ?? [];
  const toneOptions = COVER_LETTER_TONE_OPTIONS.map((option) => ({
    label: t(`workspace.coverLetter.tones.${option.value}`),
    value: option.value,
  }));
  const lengthOptions = COVER_LETTER_LENGTH_OPTIONS.map((option) => ({
    label: t(`workspace.coverLetter.lengths.${option.value}`),
    value: option.value,
  }));
  const companyOptions = COVER_LETTER_COMPANY_OPTIONS.map((option) => ({
    label: t(`workspace.coverLetter.companyTypes.${option.value}`),
    value: option.value,
  }));
  const variantsCountOptions = COVER_LETTER_VARIANTS_COUNT_OPTIONS.map((option) => ({
    label: t(option.labelKey),
    value: option.value,
  }));

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

  const onCompanyNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCoverLetterCompanyName(event.target.value);
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

    void copyToClipboardWithNotification(coverLetter.text, t('workspace.coverLetter.copied'));
  };

  const onTextDownloadClick = () => {
    if (!coverLetter) {
      return;
    }

    downloadCoverLetterText(coverLetter.text);
  };

  const renderCoverLetterVariant = ({ id, text }: CoverLetterVariantType, index: number) => {
    return (
      <article className={styles.root__variant} key={id}>
        <h3 className={styles.root__variantTitle}>{t('workspace.coverLetter.variantTitle', { count: index + 1 })}</h3>
        <p className={styles.root__variantText}>{text}</p>
      </article>
    );
  };

  return (
    <section className={styles.root}>
      <div className={styles.root__header}>
        <div>
          <h2 className={styles.root__title}>{t('workspace.coverLetter.title')}</h2>
          <p className={styles.root__subtitle}>{t('workspace.coverLetter.subtitle')}</p>
        </div>
        <Button
          disabled={!canGenerateCoverLetter}
          loading={coverLetterStatus === 'generating'}
          size="medium"
          onClick={onGenerateClick}
        >
          {coverLetterStatus === 'generating'
            ? t('workspace.coverLetter.generating')
            : t('workspace.coverLetter.generate')}
        </Button>
      </div>
      <div className={styles.root__settings}>
        <label className={styles.root__field}>
          <span className={styles.root__label}>{t('workspace.coverLetter.companyName')}</span>
          <input
            className={styles.root__input}
            placeholder={t('workspace.coverLetter.companyNamePlaceholder')}
            value={coverLetterCompanyName}
            onChange={onCompanyNameChange}
          />
        </label>
        <label className={styles.root__field}>
          <span className={styles.root__label}>{t('workspace.coverLetter.tone')}</span>
          <Select options={toneOptions} value={coverLetterTone} onChange={onToneChange} />
        </label>
        <label className={styles.root__field}>
          <span className={styles.root__label}>{t('workspace.coverLetter.length')}</span>
          <Select options={lengthOptions} value={coverLetterLength} onChange={onLengthChange} />
        </label>
        <label className={styles.root__field}>
          <span className={styles.root__label}>{t('workspace.coverLetter.companyType')}</span>
          <Select options={companyOptions} value={coverLetterCompanyType} onChange={onCompanyTypeChange} />
        </label>
        <label className={styles.root__field}>
          <span className={styles.root__label}>{t('workspace.coverLetter.variants')}</span>
          <Select
            options={variantsCountOptions}
            value={String(coverLetterVariantsCount)}
            onChange={onVariantsCountChange}
          />
        </label>
      </div>

      {coverLetter && (
        <>
          {coverLetterVariants.length > 1 && (
            <div className={styles.root__variants}>{coverLetterVariants.map(renderCoverLetterVariant)}</div>
          )}
          <Textarea
            className={styles.root__textarea}
            minHeight={260}
            value={coverLetter.text}
            onChange={onCoverLetterTextChange}
          />
          <div className={styles.root__actions}>
            <Button aria-label={t('workspace.coverLetter.copyAria')} size="small" onClick={onCopyClick}>
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
