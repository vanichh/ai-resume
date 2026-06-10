import type { ResumeTranslationLanguage, ResumeTranslationTone } from './types';

export const RESUME_WORKSPACE_STORAGE_KEY = 'ai-resume-workspace';

export const RESUME_TRANSLATION_LANGUAGE_OPTIONS: Array<{
  label: string;
  promptName: string;
  value: ResumeTranslationLanguage;
}> = [
  {
    label: 'Арабский',
    promptName: 'Arabic',
    value: 'arabic',
  },
  {
    label: 'Болгарский',
    promptName: 'Bulgarian',
    value: 'bulgarian',
  },
  {
    label: 'Китайский упрощенный',
    promptName: 'Simplified Chinese',
    value: 'chineseSimplified',
  },
  {
    label: 'Китайский традиционный',
    promptName: 'Traditional Chinese',
    value: 'chineseTraditional',
  },
  {
    label: 'Хорватский',
    promptName: 'Croatian',
    value: 'croatian',
  },
  {
    label: 'Чешский',
    promptName: 'Czech',
    value: 'czech',
  },
  {
    label: 'Датский',
    promptName: 'Danish',
    value: 'danish',
  },
  {
    label: 'Нидерландский',
    promptName: 'Dutch',
    value: 'dutch',
  },
  {
    label: 'Английский',
    promptName: 'English',
    value: 'english',
  },
  {
    label: 'Эстонский',
    promptName: 'Estonian',
    value: 'estonian',
  },
  {
    label: 'Финский',
    promptName: 'Finnish',
    value: 'finnish',
  },
  {
    label: 'Французский',
    promptName: 'French',
    value: 'french',
  },
  {
    label: 'Немецкий',
    promptName: 'German',
    value: 'german',
  },
  {
    label: 'Греческий',
    promptName: 'Greek',
    value: 'greek',
  },
  {
    label: 'Иврит',
    promptName: 'Hebrew',
    value: 'hebrew',
  },
  {
    label: 'Хинди',
    promptName: 'Hindi',
    value: 'hindi',
  },
  {
    label: 'Венгерский',
    promptName: 'Hungarian',
    value: 'hungarian',
  },
  {
    label: 'Индонезийский',
    promptName: 'Indonesian',
    value: 'indonesian',
  },
  {
    label: 'Итальянский',
    promptName: 'Italian',
    value: 'italian',
  },
  {
    label: 'Японский',
    promptName: 'Japanese',
    value: 'japanese',
  },
  {
    label: 'Корейский',
    promptName: 'Korean',
    value: 'korean',
  },
  {
    label: 'Латышский',
    promptName: 'Latvian',
    value: 'latvian',
  },
  {
    label: 'Литовский',
    promptName: 'Lithuanian',
    value: 'lithuanian',
  },
  {
    label: 'Норвежский',
    promptName: 'Norwegian',
    value: 'norwegian',
  },
  {
    label: 'Польский',
    promptName: 'Polish',
    value: 'polish',
  },
  {
    label: 'Португальский',
    promptName: 'Portuguese',
    value: 'portuguese',
  },
  {
    label: 'Румынский',
    promptName: 'Romanian',
    value: 'romanian',
  },
  {
    label: 'Сербский',
    promptName: 'Serbian',
    value: 'serbian',
  },
  {
    label: 'Словацкий',
    promptName: 'Slovak',
    value: 'slovak',
  },
  {
    label: 'Словенский',
    promptName: 'Slovenian',
    value: 'slovenian',
  },
  {
    label: 'Испанский',
    promptName: 'Spanish',
    value: 'spanish',
  },
  {
    label: 'Шведский',
    promptName: 'Swedish',
    value: 'swedish',
  },
  {
    label: 'Тайский',
    promptName: 'Thai',
    value: 'thai',
  },
  {
    label: 'Турецкий',
    promptName: 'Turkish',
    value: 'turkish',
  },
  {
    label: 'Украинский',
    promptName: 'Ukrainian',
    value: 'ukrainian',
  },
  {
    label: 'Вьетнамский',
    promptName: 'Vietnamese',
    value: 'vietnamese',
  },
];

export const RESUME_TRANSLATION_LANGUAGE_LABELS = Object.fromEntries(
  RESUME_TRANSLATION_LANGUAGE_OPTIONS.map((option) => [option.value, option.label]),
) as Record<ResumeTranslationLanguage, string>;

export const RESUME_TRANSLATION_LANGUAGE_PROMPT_NAMES = Object.fromEntries(
  RESUME_TRANSLATION_LANGUAGE_OPTIONS.map((option) => [option.value, option.promptName]),
) as Record<ResumeTranslationLanguage, string>;

export const RESUME_TRANSLATION_TONE_OPTIONS: Array<{
  label: string;
  promptInstruction: string;
  value: ResumeTranslationTone;
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
) as Record<ResumeTranslationTone, string>;

export const RESUME_TRANSLATION_TONE_PROMPT_INSTRUCTIONS = Object.fromEntries(
  RESUME_TRANSLATION_TONE_OPTIONS.map((option) => [option.value, option.promptInstruction]),
) as Record<ResumeTranslationTone, string>;
