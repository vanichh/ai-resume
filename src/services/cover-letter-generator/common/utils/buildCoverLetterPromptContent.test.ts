import { describe, expect, it } from 'vitest';

import type { ResumeAdviceType } from '@common/types';

import { buildCoverLetterPromptContent } from './buildCoverLetterPromptContent';

const options = {
  companyType: 'startup' as const,
  length: 'short' as const,
  tone: 'confident' as const,
  variantsCount: 2,
};
const advice: ResumeAdviceType = {
  score: 80,
  targetRole: 'Fallback role',
  sectionScores: [],
  summary: 'Summary',
  strengths: ['Ownership'],
  gaps: ['Metrics'],
  missingKeywords: ['React'],
  rewrittenSummary: 'Rewritten',
  rewriteSuggestions: [],
  bulletImprovements: [],
  actions: ['Add metrics'],
};

describe('buildCoverLetterPromptContent', () => {
  it('builds a multi-variant prompt with selected options and analysis', () => {
    const output = buildCoverLetterPromptContent('Resume text', advice, '', 'Vacancy text', options);

    expect(output).toContain('Generate 2 distinct variants.');
    expect(output).toContain('---VARIANT---');
    expect(output).toContain('Target role: Fallback role');
    expect(output).toContain('"actions": [\n    "Add metrics"\n  ]');
    expect(output).toContain('Resume:\nResume text');
  });

  it('uses explicit target role and handles missing vacancy and analysis', () => {
    const output = buildCoverLetterPromptContent('Resume', null, 'React Engineer', '', {
      ...options,
      variantsCount: 1,
    });

    expect(output).toContain('Target role: React Engineer');
    expect(output).toContain('Vacancy text is not provided.');
    expect(output).toContain('Resume analysis is not available.');
    expect(output).toContain('Return only one cover letter.');
  });
});
