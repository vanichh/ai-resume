import type { ChangeEvent } from 'react';

import { RESUME_TRANSLATION_TONE_OPTIONS } from '@common/constants';
import type { ResumeTranslationToneType } from '@common/types';
import { Select } from '@components/ui';

import type { TranslationToneFieldProps } from './types';

import styles from './TranslationToneField.module.scss';

export const TranslationToneField = ({ tone, onToneChange }: TranslationToneFieldProps) => {
  const onToneSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onToneChange(event.target.value as ResumeTranslationToneType);
  };

  return (
    <>
      <label className={styles.translationToneField__label} htmlFor="translation-tone">
        Тон перевода
      </label>
      <Select
        className={styles.translationToneField__select}
        id="translation-tone"
        options={RESUME_TRANSLATION_TONE_OPTIONS}
        value={tone}
        onChange={onToneSelectChange}
      />
    </>
  );
};
