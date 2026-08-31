import type {
  BrowserTranslationLanguageCodeType,
  LanguageModelLanguageCodeType,
  ResumeTranslationLanguageType,
} from '../types';

export const RESUME_TRANSLATION_LANGUAGE_OPTIONS: Array<{
  promptName: string;
  value: ResumeTranslationLanguageType;
}> = [
  {
    promptName: 'Arabic',
    value: 'arabic',
  },
  {
    promptName: 'Bulgarian',
    value: 'bulgarian',
  },
  {
    promptName: 'Simplified Chinese',
    value: 'chineseSimplified',
  },
  {
    promptName: 'Traditional Chinese',
    value: 'chineseTraditional',
  },
  {
    promptName: 'Croatian',
    value: 'croatian',
  },
  {
    promptName: 'Czech',
    value: 'czech',
  },
  {
    promptName: 'Danish',
    value: 'danish',
  },
  {
    promptName: 'Dutch',
    value: 'dutch',
  },
  {
    promptName: 'English',
    value: 'english',
  },
  {
    promptName: 'Estonian',
    value: 'estonian',
  },
  {
    promptName: 'Finnish',
    value: 'finnish',
  },
  {
    promptName: 'French',
    value: 'french',
  },
  {
    promptName: 'German',
    value: 'german',
  },
  {
    promptName: 'Greek',
    value: 'greek',
  },
  {
    promptName: 'Hebrew',
    value: 'hebrew',
  },
  {
    promptName: 'Hindi',
    value: 'hindi',
  },
  {
    promptName: 'Hungarian',
    value: 'hungarian',
  },
  {
    promptName: 'Indonesian',
    value: 'indonesian',
  },
  {
    promptName: 'Italian',
    value: 'italian',
  },
  {
    promptName: 'Japanese',
    value: 'japanese',
  },
  {
    promptName: 'Korean',
    value: 'korean',
  },
  {
    promptName: 'Latvian',
    value: 'latvian',
  },
  {
    promptName: 'Lithuanian',
    value: 'lithuanian',
  },
  {
    promptName: 'Norwegian',
    value: 'norwegian',
  },
  {
    promptName: 'Polish',
    value: 'polish',
  },
  {
    promptName: 'Portuguese',
    value: 'portuguese',
  },
  {
    promptName: 'Romanian',
    value: 'romanian',
  },
  {
    promptName: 'Serbian',
    value: 'serbian',
  },
  {
    promptName: 'Slovak',
    value: 'slovak',
  },
  {
    promptName: 'Slovenian',
    value: 'slovenian',
  },
  {
    promptName: 'Spanish',
    value: 'spanish',
  },
  {
    promptName: 'Swedish',
    value: 'swedish',
  },
  {
    promptName: 'Thai',
    value: 'thai',
  },
  {
    promptName: 'Turkish',
    value: 'turkish',
  },
  {
    promptName: 'Ukrainian',
    value: 'ukrainian',
  },
  {
    promptName: 'Vietnamese',
    value: 'vietnamese',
  },
];

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

export const RESUME_TRANSLATION_BROWSER_LANGUAGE_CODES: Partial<
  Record<ResumeTranslationLanguageType, BrowserTranslationLanguageCodeType>
> = {
  arabic: 'ar',
  bulgarian: 'bg',
  chineseSimplified: 'zh',
  chineseTraditional: 'zh-Hant',
  croatian: 'hr',
  czech: 'cs',
  danish: 'da',
  dutch: 'nl',
  english: 'en',
  finnish: 'fi',
  french: 'fr',
  german: 'de',
  greek: 'el',
  hebrew: 'he',
  hindi: 'hi',
  hungarian: 'hu',
  indonesian: 'id',
  italian: 'it',
  japanese: 'ja',
  korean: 'ko',
  lithuanian: 'lt',
  norwegian: 'no',
  polish: 'pl',
  portuguese: 'pt',
  romanian: 'ro',
  slovak: 'sk',
  slovenian: 'sl',
  spanish: 'es',
  swedish: 'sv',
  thai: 'th',
  turkish: 'tr',
  ukrainian: 'uk',
  vietnamese: 'vi',
};
