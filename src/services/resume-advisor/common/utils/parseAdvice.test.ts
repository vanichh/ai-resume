import { describe, expect, it } from 'vitest';

import { parseAdvice } from './parseAdvice';

describe('parseAdvice', () => {
  it('parses and normalizes valid advice payloads', () => {
    const payload = {
      score: 84.8,
      targetRole: 'Senior Frontend Engineer',
      sectionScores: [
        { title: 'Profile', score: 88, comment: 'Strong positioning' },
        { title: 'Experience', score: 75, comment: 'Need metrics' },
        { title: 'Skills', score: 90, comment: 'Relevant stack' },
        { title: 'Keywords', score: 82, comment: 'Very close' },
      ],
      summary: 'Strong product-minded engineer.',
      strengths: ['React expertise', 'Delivery focus', 'Collaboration'],
      gaps: ['Missing metrics', 'Weak leadership examples', 'No clear impact statement'],
      missingKeywords: ['TypeScript', 'Performance', 'Design systems'],
      rewrittenSummary: 'Product-minded React engineer with strong delivery and collaboration skills.',
      rewriteSuggestions: [
        {
          original: 'Built features',
          improved: 'Delivered features for customer onboarding and retention.',
          reason: 'Adds user impact and specificity.',
        },
      ],
      bulletImprovements: ['Rewrite bullets with measurable outcomes.'],
      actions: ['Add metrics', 'Highlight team leadership', 'Align keywords', 'Tighten summary'],
    };

    const result = parseAdvice(JSON.stringify(payload));

    expect(result.score).toBe(85);
    expect(result.targetRole).toBe('Senior Frontend Engineer');
    expect(result.sectionScores[0]?.score).toBe(88);
    expect(result.rewriteSuggestions[0]).toEqual({
      original: 'Built features',
      improved: 'Delivered features for customer onboarding and retention.',
      reason: 'Adds user impact and specificity.',
    });
  });

  it('throws for unsupported response structures', () => {
    expect(() => parseAdvice('{"score": "bad"}')).toThrow('Модель вернула неожиданный формат ответа.');
  });
});
