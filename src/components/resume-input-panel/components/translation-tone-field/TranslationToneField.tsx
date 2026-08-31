import type { ChangeEvent } from 'react';

import { useTranslation } from 'react-i18next';

import { RESUME_TRANSLATION_TONE_OPTIONS } from '@common/constants';
import type { ResumeTranslationToneType } from '@common/types';
import { Select } from '@components/ui';

import type { TranslationToneFieldProps } from './types';

import styles from './TranslationToneField.module.scss';

export const TranslationToneField = ({ tone, onToneChange }: TranslationToneFieldProps) => {
  const { t } = useTranslation();
  const toneOptions = RESUME_TRANSLATION_TONE_OPTIONS.map((option) => ({
    label: t(`workspace.translation.tones.${option.value}`),
    value: option.value,
  }));
  const onToneSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onToneChange(event.target.value as ResumeTranslationToneType);
  };

  return (
    <>
      <label className={styles.root__label} htmlFor="translation-tone">
        {t('workspace.translation.tone')}
      </label>
      <Select
        className={styles.root__select}
        id="translation-tone"
        options={toneOptions}
        value={tone}
        onChange={onToneSelectChange}
      />
    </>
  );
};
