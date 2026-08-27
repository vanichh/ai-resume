import { describe, expect, it } from 'vitest';

import { buildTranslationPromptContent } from './buildTranslationPromptContent';

describe('buildTranslationPromptContent', () => {
  it('includes chunk context, translation constraints, and retry guidance', () => {
    const output = buildTranslationPromptContent('SUMMARY\nText', 1, 3, 'German', 'Use a formal tone.', true);

    expect(output).toContain('Translate resume fragment 2 of 3 into German.');
    expect(output).toContain('previous response was not a valid translation');
    expect(output).toContain('Use a formal tone.');
    expect(output).toContain('SUMMARY\nText');
  });

  it('omits retry guidance for the first attempt', () => {
    expect(buildTranslationPromptContent('Text', 0, 1, 'English', '', false)).not.toContain('previous response');
  });
});
