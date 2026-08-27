import { describe, expect, it } from 'vitest';

import { prepareResumeForPrompt } from './prepareResumeForPrompt';

import { MAX_PROMPT_RESUME_LENGTH } from '../constants';

describe('prepareResumeForPrompt', () => {
  it('leaves short resumes unchanged', () => {
    const resume = 'Summary\nSenior frontend engineer with React and TypeScript experience.';

    expect(prepareResumeForPrompt(resume)).toBe(resume);
  });

  it('keeps only prioritized sections and trims to the prompt limit', () => {
    const longResume = [
      'SUMMARY\nProduct engineer focused on customer-facing UX and delivery.',
      'SKILLS\nReact TypeScript Node.js SQL CSS',
      `EXPERIENCE\n${'Senior engineer working with product teams and shipping features. '.repeat(80)}`,
      'EDUCATION\nBSc in Computer Science',
    ].join('\n\n');

    const prepared = prepareResumeForPrompt(longResume);

    expect(prepared.length).toBeLessThanOrEqual(MAX_PROMPT_RESUME_LENGTH);
    expect(prepared).toContain('EXPERIENCE');
    expect(prepared).toContain('SKILLS');
  });
});
