import { describe, expect, it } from 'vitest';

import { getResumeSectionTitle } from './getResumeSectionTitle';

const titles = {
  education: 'Education',
  experience: 'Experience',
  keywords: 'Keywords',
  metrics: 'Metrics',
  skills: 'Skills',
  summary: 'Summary',
};

describe('getResumeSectionTitle', () => {
  it('maps supported English and Russian headings case-insensitively', () => {
    expect(getResumeSectionTitle('  ОПЫТ РАБОТЫ ', titles)).toBe('Experience');
    expect(getResumeSectionTitle('skills', titles)).toBe('Skills');
    expect(getResumeSectionTitle('метрики', titles)).toBe('Metrics');
  });

  it('preserves unknown headings', () => {
    expect(getResumeSectionTitle('Projects', titles)).toBe('Projects');
  });
});
