import type { AtsMatch } from '@common/types';

const MIN_KEYWORD_LENGTH = 3;
const MAX_KEYWORDS = 32;

const STOP_WORDS = new Set([
  'and',
  'are',
  'for',
  'the',
  'with',
  'you',
  'your',
  'или',
  'как',
  'для',
  'что',
  'это',
  'the',
]);

export function calculateAtsMatch(resumeText: string, vacancyText: string): AtsMatch {
  const normalizedResume = normalize(resumeText);
  const keywords = extractKeywords(vacancyText);
  const matches = keywords.map((keyword) => ({
    keyword,
    matched: normalizedResume.includes(normalize(keyword)),
  }));
  const matchedCount = matches.filter((match) => match.matched).length;
  const missingCount = matches.length - matchedCount;

  return {
    keywords: matches,
    matchedCount,
    missingCount,
    score: keywords.length === 0 ? 0 : Math.round((matchedCount / keywords.length) * 100),
  };
}

function extractKeywords(value: string): string[] {
  const words = normalize(value)
    .split(' ')
    .filter((word) => word.length >= MIN_KEYWORD_LENGTH && !STOP_WORDS.has(word));

  return [...new Set(words)].slice(0, MAX_KEYWORDS);
}

function normalize(value: string): string {
  return value
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}+#.]+/gu, ' ')
    .trim();
}
