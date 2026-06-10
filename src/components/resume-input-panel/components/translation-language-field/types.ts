import type { ResumeTranslationLanguage } from '@common/types';

export type TranslationLanguageFieldProps = {
  language: ResumeTranslationLanguage;
  onLanguageChange: (value: ResumeTranslationLanguage) => void;
};
