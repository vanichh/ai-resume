import { describe, expect, it } from 'vitest';

import { parseCoverLetterVariants } from './parseCoverLetterVariants';

describe('parseCoverLetterVariants', () => {
  it('trims, filters empty variants, and assigns stable display titles', () => {
    const variants = parseCoverLetterVariants(' First letter \n---VARIANT---\n\n---VARIANT--- Second letter ');

    expect(variants).toHaveLength(2);
    expect(variants.map(({ text, title }) => ({ text, title }))).toEqual([
      { text: 'First letter', title: 'Вариант 1' },
      { text: 'Second letter', title: 'Вариант 2' },
    ]);
    expect(new Set(variants.map((variant) => variant.id)).size).toBe(2);
  });

  it('returns no variants for whitespace-only model output', () => {
    expect(parseCoverLetterVariants(' \n\t ')).toEqual([]);
  });
});
