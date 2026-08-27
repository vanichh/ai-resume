import { describe, expect, it } from 'vitest';

import { normalizeCoverLetterVariantsCount } from './normalizeCoverLetterVariantsCount';

describe('normalizeCoverLetterVariantsCount', () => {
  it('uses a safe default when input is invalid', () => {
    expect(normalizeCoverLetterVariantsCount(Number.NaN)).toBe(1);
    expect(normalizeCoverLetterVariantsCount(0)).toBe(1);
  });

  it('rounds and clamps to allowed range', () => {
    expect(normalizeCoverLetterVariantsCount(2.4)).toBe(2);
    expect(normalizeCoverLetterVariantsCount(2.6)).toBe(3);
    expect(normalizeCoverLetterVariantsCount(99)).toBe(3);
  });
});
