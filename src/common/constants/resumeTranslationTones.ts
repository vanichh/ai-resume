import type { ResumeTranslationToneType } from '../types';

export const RESUME_TRANSLATION_TONE_OPTIONS: Array<{
  promptInstruction: string;
  value: ResumeTranslationToneType;
}> = [
  {
    promptInstruction: 'Make the translation ATS-friendly, preserving clear role keywords and standard resume wording.',
    value: 'atsFriendly',
  },
  {
    promptInstruction: 'Use a formal professional tone suitable for corporate hiring processes.',
    value: 'formal',
  },
  {
    promptInstruction: 'Use concise wording while preserving all facts, achievements, metrics, and technologies.',
    value: 'concise',
  },
  {
    promptInstruction: 'Use recruiter-friendly wording with clear achievements and easy scanning.',
    value: 'recruiterFriendly',
  },
];

export const RESUME_TRANSLATION_TONE_PROMPT_INSTRUCTIONS = Object.fromEntries(
  RESUME_TRANSLATION_TONE_OPTIONS.map((option) => [option.value, option.promptInstruction]),
) as Record<ResumeTranslationToneType, string>;
