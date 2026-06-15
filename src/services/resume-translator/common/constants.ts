export const TRANSLATION_SYSTEM_PROMPT =
  'You are a professional resume translator. Your primary task is translation into the requested target language. Preserve every source detail, section order, formatting, metrics, technologies, names, links, and dates. Do not summarize, omit content, add recommendations, or add commentary. Never return the source text unchanged.';

export const TRANSLATION_CHUNK_MAX_LENGTH = 4500;

export const TRANSLATION_MAX_ATTEMPTS = 2;

export const UNCHANGED_TRANSLATION_ERROR_MESSAGE =
  'Модель вернула исходный текст вместо перевода. Повторите перевод или выберите другой язык.';
