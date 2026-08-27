import { describe, expect, it } from 'vitest';

import type { ResumeAdviceType } from '@common/types';

import { formatAdviceReportHtml } from './formatAdviceReportHtml';

const advice: ResumeAdviceType = {
  score: 91,
  targetRole: '<Frontend>',
  sectionScores: [{ title: 'Skills', score: 90, comment: 'Use <strong>metrics</strong>' }],
  summary: 'Safe & clear',
  strengths: ['React <5 years'],
  gaps: ['Missing "impact"'],
  missingKeywords: ['TypeScript'],
  rewrittenSummary: 'Engineer & builder',
  rewriteSuggestions: [{ original: '<old>', improved: 'new', reason: 'Better & clearer' }],
  bulletImprovements: ['Quantify results'],
  actions: ['Update profile'],
};

describe('formatAdviceReportHtml', () => {
  it('renders a complete report and escapes user-provided HTML', () => {
    const output = formatAdviceReportHtml(advice);

    expect(output).toContain('<!doctype html>');
    expect(output).toContain('<h1>&lt;Frontend&gt;</h1>');
    expect(output).toContain('Safe &amp; clear');
    expect(output).toContain('&lt;strong&gt;metrics&lt;/strong&gt;');
    expect(output).toContain('<span>TypeScript</span>');
    expect(output).not.toContain('<h1><Frontend>');
  });
});
