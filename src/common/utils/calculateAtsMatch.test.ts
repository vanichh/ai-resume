import { describe, expect, it } from 'vitest';

import { calculateAtsMatch } from './calculateAtsMatch';

describe('calculateAtsMatch', () => {
  it('matches relevant keywords and ignores stop words', () => {
    const result = calculateAtsMatch(
      'Senior product manager with leadership experience in React, analytics and roadmap planning.',
      'Product Manager React Analytics Roadmap Leadership',
    );

    expect(result.score).toBe(100);
    expect(result.matchedCount).toBe(6);
    expect(result.missingCount).toBe(0);
    expect(result.keywords.every((keyword) => keyword.matched)).toBe(true);
  });

  it('returns zero when vacancy has no usable keywords', () => {
    expect(calculateAtsMatch('React TypeScript product experience', '')).toEqual({
      keywords: [],
      matchedCount: 0,
      missingCount: 0,
      score: 0,
    });
  });
});
