import type { ResumeTranslationToneType } from '../types';

export const RESUME_TRANSLATION_TONE_OPTIONS: Array<{
  label: string;
  promptInstruction: string;
  value: ResumeTranslationToneType;
}> = [
  {
    label: 'Для ATS',
    promptInstruction: 'Make the translation ATS-friendly, preserving clear role keywords and standard resume wording.',
    value: 'atsFriendly',
  },
  {
    label: 'Формальный',
    promptInstruction: 'Use a formal professional tone suitable for corporate hiring processes.',
    value: 'formal',
  },
  {
    label: 'Краткий',
    promptInstruction: 'Use concise wording while preserving all facts, achievements, metrics, and technologies.',
    value: 'concise',
  },
  {
    label: 'Для рекрутера',
    promptInstruction: 'Use recruiter-friendly wording with clear achievements and easy scanning.',
    value: 'recruiterFriendly',
  },
];

export const RESUME_TRANSLATION_TONE_LABELS = Object.fromEntries(
  RESUME_TRANSLATION_TONE_OPTIONS.map((option) => [option.value, option.label]),
) as Record<ResumeTranslationToneType, string>;

export const RESUME_TRANSLATION_TONE_PROMPT_INSTRUCTIONS = Object.fromEntries(
  RESUME_TRANSLATION_TONE_OPTIONS.map((option) => [option.value, option.promptInstruction]),
) as Record<ResumeTranslationToneType, string>;
