import type { ChangeEvent } from 'react';

import { useTranslation } from 'react-i18next';

import { RESUME_TRANSLATION_LANGUAGE_OPTIONS } from '@common/constants';
import type { ResumeTranslationLanguageType } from '@common/types';
import { Select } from '@components/ui';

import type { TranslationLanguageFieldProps } from './types';

import styles from './TranslationLanguageField.module.scss';

export const TranslationLanguageField = ({ language, onLanguageChange }: TranslationLanguageFieldProps) => {
  const { t } = useTranslation();
  const languageOptions = RESUME_TRANSLATION_LANGUAGE_OPTIONS.map((option) => ({
    label: t(`workspace.translation.languages.${option.value}`),
    value: option.value,
  }));
  const onLanguageSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(event.target.value as ResumeTranslationLanguageType);
  };

  return (
    <>
      <label className={styles.root__label} htmlFor="translation-language">
        {t('workspace.translation.language')}
      </label>
      <Select
        className={styles.root__select}
        id="translation-language"
        options={languageOptions}
        value={language}
        onChange={onLanguageSelectChange}
      />
    </>
  );
};
