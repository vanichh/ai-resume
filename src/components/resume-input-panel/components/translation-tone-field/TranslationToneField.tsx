import { RESUME_TRANSLATION_TONE_OPTIONS } from '@common/constants';
import type { ResumeTranslationTone } from '@common/types';

import type { TranslationToneFieldProps } from './types';

import styles from './TranslationToneField.module.scss';

export function TranslationToneField({ tone, onToneChange }: TranslationToneFieldProps) {
  return (
    <>
      <label className={styles.translationToneField__label} htmlFor="translation-tone">
        Тон перевода
      </label>
      <select
        className={styles.translationToneField__select}
        id="translation-tone"
        value={tone}
        onChange={(event) => onToneChange(event.target.value as ResumeTranslationTone)}
      >
        {RESUME_TRANSLATION_TONE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
