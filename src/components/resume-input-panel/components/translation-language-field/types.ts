import type { ResumeTranslationLanguageType } from '@common/types';

export type TranslationLanguageFieldProps = {
  language: ResumeTranslationLanguageType;
  onLanguageChange: (value: ResumeTranslationLanguageType) => void;
};
