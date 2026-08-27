import { describe, expect, it } from 'vitest';

import { normalizeText } from './normalizeText';

describe('normalizeText', () => {
  it('normalizes carriage returns, trailing whitespace, and excess blank lines', () => {
    expect(normalizeText('  Summary  \r\nSkills\t\r\n\r\n\r\nExperience  ')).toBe('  Summary\nSkills\n\nExperience');
  });

  it('returns an empty string for whitespace-only input', () => {
    expect(normalizeText(' \r\n\t ')).toBe('');
  });
});
