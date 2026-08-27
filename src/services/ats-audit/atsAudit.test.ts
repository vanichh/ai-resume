import { describe, expect, it } from 'vitest';

import { calculateAtsAudit } from './atsAudit';

const checksById = (resumeText: string, vacancyText = '') => {
  return Object.fromEntries(calculateAtsAudit(resumeText, vacancyText).checks.map((check) => [check.id, check]));
};

describe('calculateAtsAudit', () => {
  it('returns an empty audit for an empty resume', () => {
    expect(calculateAtsAudit('   ', 'React')).toEqual({
      checks: [],
      failedCount: 0,
      passedCount: 0,
      score: 0,
      warningCount: 0,
    });
  });

  it('detects contact details, sections, structure, and keyword coverage', () => {
    const resume = [
      'SUMMARY',
      'Product engineer focused on reliable customer experiences.',
      'WORK EXPERIENCE',
      'Senior engineer 2021 - 2024',
      '• Delivered 12 projects for 30 clients',
      '• Improved conversion by 25%',
      '• Led a team of 6 people',
      'SKILLS',
      'React TypeScript Node.js',
      'EDUCATION',
      'BSc Computer Science 2018',
      'alex@example.com +1 (555) 123-4567 https://github.com/alex',
    ].join('\n');

    const audit = calculateAtsAudit(resume, 'React TypeScript Python');
    const checks = checksById(resume, 'React TypeScript Python');

    expect(checks.email.status).toBe('passed');
    expect(checks.phone.status).toBe('passed');
    expect(checks['professional-link'].status).toBe('passed');
    expect(checks['summary-section'].status).toBe('passed');
    expect(checks['experience-section'].status).toBe('passed');
    expect(checks['skills-section'].status).toBe('passed');
    expect(checks['education-section'].status).toBe('passed');
    expect(checks.bullets.values).toEqual({ count: 3 });
    expect(checks.metrics.values).toEqual({ count: 3 });
    expect(checks.dates.values).toEqual({ count: 3 });
    expect(checks['vacancy-keywords'].values).toMatchObject({ matchedCount: 2, totalCount: 3, score: 67 });
    expect(audit.failedCount).toBe(1);
    expect(audit.warningCount).toBe(1);
    expect(audit.passedCount).toBe(10);
  });

  it('reports missing content and skips keyword checks without a vacancy', () => {
    const resume = 'Short profile without contact details.';
    const audit = calculateAtsAudit(resume, '');
    const checks = checksById(resume);

    expect(checks.email.status).toBe('failed');
    expect(checks.phone.status).toBe('failed');
    expect(checks['professional-link'].status).toBe('warning');
    expect(checks['experience-section'].status).toBe('failed');
    expect(checks['vacancy-keywords']).toMatchObject({
      status: 'skipped',
      message: 'keywordsMissingVacancy',
      earnedPoints: 0,
    });
    expect(audit.failedCount).toBe(8);
    expect(audit.warningCount).toBe(3);
    expect(audit.passedCount).toBe(0);
  });
});
