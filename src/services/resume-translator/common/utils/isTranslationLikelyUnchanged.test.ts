import { describe, expect, it } from 'vitest';

import { isTranslationLikelyUnchanged } from './isTranslationLikelyUnchanged';

describe('isTranslationLikelyUnchanged', () => {
  it('flags highly similar translations after normalization', () => {
    expect(isTranslationLikelyUnchanged('Senior engineer with React', ' senior  engineer WITH react ', 'german')).toBe(
      true,
    );
    expect(isTranslationLikelyUnchanged('Senior engineer with React', 'Senior developer using React', 'german')).toBe(
      false,
    );
  });

  it('flags Cyrillic output for non-Cyrillic target languages', () => {
    expect(isTranslationLikelyUnchanged('Опыт работы в компании', 'Опыт работы в компании', 'english')).toBe(true);
    expect(isTranslationLikelyUnchanged('Опыт работы в компании', 'Iskustvo rada u kompaniji', 'serbian')).toBe(false);
  });

  it('does not treat empty content as unchanged', () => {
    expect(isTranslationLikelyUnchanged('', '', 'english')).toBe(false);
    expect(isTranslationLikelyUnchanged('Resume', '', 'english')).toBe(false);
  });
});
