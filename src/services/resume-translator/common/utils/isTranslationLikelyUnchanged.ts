import type { ResumeTranslationLanguageType } from '@common/types';

const CYRILLIC_PATTERN = /[А-Яа-яЁё]/;

const CYRILLIC_TARGET_LANGUAGES = new Set<ResumeTranslationLanguageType>(['bulgarian', 'serbian', 'ukrainian']);

const normalizeText = (text: string): string => {
  return text.replace(/\s+/g, ' ').trim().toLowerCase();
};

const getSimilarityRatio = (sourceText: string, translatedText: string): number => {
  const normalizedSource = normalizeText(sourceText);
  const normalizedTranslation = normalizeText(translatedText);

  if (!normalizedSource || !normalizedTranslation) {
    return 0;
  }

  const shortestLength = Math.min(normalizedSource.length, normalizedTranslation.length);
  let sameCharactersCount = 0;

  for (let index = 0; index < shortestLength; index += 1) {
    if (normalizedSource[index] === normalizedTranslation[index]) {
      sameCharactersCount += 1;
    }
  }

  return sameCharactersCount / Math.max(normalizedSource.length, normalizedTranslation.length);
};

export const isTranslationLikelyUnchanged = (
  sourceText: string,
  translatedText: string,
  targetLanguage: ResumeTranslationLanguageType,
): boolean => {
  const sourceHasCyrillic = CYRILLIC_PATTERN.test(sourceText);
  const translationHasCyrillic = CYRILLIC_PATTERN.test(translatedText);
  const shouldRemoveCyrillic = !CYRILLIC_TARGET_LANGUAGES.has(targetLanguage);

  if (sourceHasCyrillic && translationHasCyrillic && shouldRemoveCyrillic) {
    return true;
  }

  return getSimilarityRatio(sourceText, translatedText) > 0.9;
};
