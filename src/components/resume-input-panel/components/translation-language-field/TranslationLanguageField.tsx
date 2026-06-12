import { RESUME_TRANSLATION_LANGUAGE_OPTIONS } from '@common/constants';
import type { ResumeTranslationLanguageType } from '@common/types';

import { Select } from '@components/ui';

import type { TranslationLanguageFieldProps } from './types';

import styles from './TranslationLanguageField.module.scss';

export function TranslationLanguageField({ language, onLanguageChange }: TranslationLanguageFieldProps) {
  return (
    <>
      <label className={styles.translationLanguageField__label} htmlFor="translation-language">
        Язык перевода
      </label>
      <Select
        className={styles.translationLanguageField__select}
        id="translation-language"
        options={RESUME_TRANSLATION_LANGUAGE_OPTIONS}
        value={language}
        onChange={(event) => onLanguageChange(event.target.value as ResumeTranslationLanguageType)}
      />
    </>
  );
}
