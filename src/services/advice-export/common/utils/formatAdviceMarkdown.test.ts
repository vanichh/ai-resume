import { describe, expect, it } from 'vitest';

import type { ResumeAdviceType } from '@common/types';

import { formatAdviceMarkdown } from './formatAdviceMarkdown';

const advice: ResumeAdviceType = {
  score: 82,
  targetRole: 'Frontend Engineer',
  sectionScores: [{ title: 'Опыт', score: 75, comment: 'Добавьте метрики' }],
  summary: 'Сильный профиль.',
  strengths: ['React'],
  gaps: ['Метрики'],
  missingKeywords: ['TypeScript'],
  rewrittenSummary: 'Инженер по интерфейсам.',
  rewriteSuggestions: [{ original: 'Built UI', improved: 'Built accessible UI', reason: 'Adds specificity' }],
  bulletImprovements: ['Add impact'],
  actions: ['Add metrics'],
};

describe('formatAdviceMarkdown', () => {
  it('renders all advice sections and rewrite comparisons', () => {
    const output = formatAdviceMarkdown(advice);

    expect(output).toContain('# Рекомендации по резюме: Frontend Engineer');
    expect(output).toContain('Оценка: 82/100');
    expect(output).toContain('- Опыт: 75/100 - Добавьте метрики');
    expect(output).toContain('- До: Built UI\n  После: Built accessible UI\n  Причина: Adds specificity');
    expect(output).toContain('## Действия\n- Add metrics');
  });
});
