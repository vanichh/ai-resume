import type { ResumeTranslationTone } from '@common/types';

export type TranslationToneFieldProps = {
  tone: ResumeTranslationTone;
  onToneChange: (value: ResumeTranslationTone) => void;
};
