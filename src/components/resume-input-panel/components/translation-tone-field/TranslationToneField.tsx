import { RESUME_TRANSLATION_TONE_OPTIONS } from '@common/constants';
import type { ResumeTranslationToneType } from '@common/types';

import { Select } from '@components/ui';

import type { TranslationToneFieldProps } from './types';

import styles from './TranslationToneField.module.scss';

export function TranslationToneField({ tone, onToneChange }: TranslationToneFieldProps) {
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
        onChange={(event) => onToneChange(event.target.value as ResumeTranslationToneType)}
      />
    </>
  );
}
