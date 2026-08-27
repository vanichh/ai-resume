import { describe, expect, it } from 'vitest';

import { splitResumeForTranslation } from './splitResumeForTranslation';

import { TRANSLATION_CHUNK_MAX_LENGTH } from '../constants';

describe('splitResumeForTranslation', () => {
  it('groups short paragraphs without exceeding the chunk limit', () => {
    const chunks = splitResumeForTranslation('Summary\nA\n\nExperience\nB');

    expect(chunks).toEqual(['Summary\nA\n\nExperience\nB']);
  });

  it('splits long lines into bounded chunks while preserving all content', () => {
    const line = 'x'.repeat(TRANSLATION_CHUNK_MAX_LENGTH * 2 + 17);
    const chunks = splitResumeForTranslation(line);

    expect(chunks).toHaveLength(3);
    expect(chunks.every((chunk) => chunk.length <= TRANSLATION_CHUNK_MAX_LENGTH)).toBe(true);
    expect(chunks.join('')).toBe(line);
  });

  it('flushes paragraphs around oversized blocks and preserves ordering', () => {
    const first = 'first paragraph';
    const oversized = `Heading\n${'y'.repeat(TRANSLATION_CHUNK_MAX_LENGTH)}`;
    const last = 'last paragraph';
    const chunks = splitResumeForTranslation([first, oversized, last].join('\n\n'));

    expect(chunks[0]).toBe(first);
    expect(chunks.at(-1)).toBe(last);
    expect(chunks.join('\n')).toContain('Heading');
    expect(chunks.every((chunk) => chunk.length <= TRANSLATION_CHUNK_MAX_LENGTH)).toBe(true);
  });

  it('falls back to the original input when it contains no content', () => {
    expect(splitResumeForTranslation('')).toEqual(['']);
  });
});
