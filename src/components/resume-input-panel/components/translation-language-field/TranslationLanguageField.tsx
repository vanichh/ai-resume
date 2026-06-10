import { RESUME_TRANSLATION_LANGUAGE_OPTIONS } from '@common/constants';
import type { ResumeTranslationLanguage } from '@common/types';

import styles from './TranslationLanguageField.module.scss';
import type { TranslationLanguageFieldProps } from './types';

export function TranslationLanguageField({ language, onLanguageChange }: TranslationLanguageFieldProps) {
  return (
    <>
      <label className={styles.translationLanguageField__label} htmlFor="translation-language">
        Язык перевода
      </label>
      <select
        className={styles.translationLanguageField__select}
        id="translation-language"
        value={language}
        onChange={(event) => onLanguageChange(event.target.value as ResumeTranslationLanguage)}
      >
        {RESUME_TRANSLATION_LANGUAGE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
