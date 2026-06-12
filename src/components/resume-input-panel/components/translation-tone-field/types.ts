import type { ResumeTranslationToneType } from '@common/types';

export type TranslationToneFieldProps = {
  tone: ResumeTranslationToneType;
  onToneChange: (value: ResumeTranslationToneType) => void;
};
