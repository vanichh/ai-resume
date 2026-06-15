import type { LanguageModelLanguageCodeType, ResumeTranslationLanguageType } from '../types';

export const RESUME_TRANSLATION_LANGUAGE_OPTIONS: Array<{
  label: string;
  promptName: string;
  value: ResumeTranslationLanguageType;
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
) as Record<ResumeTranslationLanguageType, string>;

export const RESUME_TRANSLATION_LANGUAGE_PROMPT_NAMES = Object.fromEntries(
  RESUME_TRANSLATION_LANGUAGE_OPTIONS.map((option) => [option.value, option.promptName]),
) as Record<ResumeTranslationLanguageType, string>;

export const RESUME_TRANSLATION_LANGUAGE_MODEL_OUTPUT_CODES: Partial<
  Record<ResumeTranslationLanguageType, LanguageModelLanguageCodeType>
> = {
  english: 'en',
  french: 'fr',
  german: 'de',
  japanese: 'ja',
  spanish: 'es',
};
