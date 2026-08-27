import type { AtsAuditCheckStatusType, AtsAuditCheckType, AtsAuditType } from '@common/types';
import { calculateAtsMatch } from '@common/utils/calculateAtsMatch';

const EMAIL_REGEX = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const PHONE_CANDIDATE_REGEX = /(?:\+?\d[\d\s().-]{8,}\d)/g;
const PROFESSIONAL_LINK_REGEX =
  /(?:https?:\/\/|www\.|linkedin\.com|github\.com|gitlab\.com|behance\.net|dribbble\.com)/i;
const BULLET_REGEX = /^\s*[-*•▪◦●]\s+\S/;
const YEAR_REGEX = /\b(?:19|20)\d{2}\b/g;
const WORD_REGEX = /[\p{L}\p{N}][\p{L}\p{N}+#.-]*/gu;
const METRIC_REGEX =
  /(?:[$€£₽]\s*\d)|(?:\d+(?:[.,]\d+)?\s*(?:%|×|[xkm]\b|тыс(?:\.|\b)|млн(?:\.|\b)|млрд(?:\.|\b)|проект(?:а|ов)?\b|клиент(?:а|ов)?\b|пользовател(?:я|ей)\b|релиз(?:а|ов)?\b|человек\b|сотрудник(?:а|ов)?\b|projects?\b|clients?\b|users?\b|releases?\b|employees?\b|people\b))/i;

const SECTION_HEADINGS = {
  education: ['образование', 'education', 'academic background'],
  experience: [
    'опыт работы',
    'профессиональный опыт',
    'work experience',
    'professional experience',
    'employment history',
  ],
  skills: ['навыки', 'ключевые навыки', 'компетенции', 'skills', 'technical skills', 'core competencies'],
  summary: [
    'о себе',
    'профиль',
    'профессиональный профиль',
    'summary',
    'profile',
    'professional summary',
    'career summary',
  ],
} as const;

const CHECK_WEIGHTS = {
  bullets: 8,
  dates: 8,
  education: 6,
  email: 8,
  experience: 12,
  keywords: 12,
  length: 7,
  link: 5,
  metrics: 12,
  phone: 7,
  skills: 8,
  summary: 7,
} as const;

const EMPTY_AUDIT: AtsAuditType = {
  checks: [],
  failedCount: 0,
  passedCount: 0,
  score: 0,
  warningCount: 0,
};

const createCheck = (
  id: string,
  label: string,
  description: string,
  maxPoints: number,
  status: AtsAuditCheckStatusType,
  earnedPoints = status === 'passed' ? maxPoints : status === 'warning' ? Math.round(maxPoints / 2) : 0,
): AtsAuditCheckType => ({
  description,
  earnedPoints,
  id,
  label,
  maxPoints,
  status,
});

const normalizeLine = (value: string): string => {
  return value
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}+#]+/gu, ' ')
    .trim();
};

const hasSection = (lines: string[], headings: readonly string[]): boolean => {
  return lines.some((line) => {
    const normalizedLine = normalizeLine(line);

    return (
      normalizedLine.length <= 80 &&
      headings.some((heading) => normalizedLine === heading || normalizedLine.startsWith(`${heading} `))
    );
  });
};

const hasPhoneNumber = (resumeText: string): boolean => {
  const candidates = resumeText.match(PHONE_CANDIDATE_REGEX) ?? [];

  return candidates.some((candidate) => {
    const digitsCount = candidate.replace(/\D/g, '').length;
    return digitsCount >= 10 && digitsCount <= 15;
  });
};

const getContactChecks = (resumeText: string): AtsAuditCheckType[] => {
  const hasEmail = EMAIL_REGEX.test(resumeText);
  const hasPhone = hasPhoneNumber(resumeText);
  const hasProfessionalLink = PROFESSIONAL_LINK_REGEX.test(resumeText);

  return [
    createCheck(
      'email',
      'Email',
      hasEmail ? 'Email найден и доступен ATS-парсеру.' : 'Добавьте email в текстовый блок контактов.',
      CHECK_WEIGHTS.email,
      hasEmail ? 'passed' : 'failed',
    ),
    createCheck(
      'phone',
      'Телефон',
      hasPhone ? 'Номер телефона найден.' : 'Добавьте номер телефона с кодом страны.',
      CHECK_WEIGHTS.phone,
      hasPhone ? 'passed' : 'failed',
    ),
    createCheck(
      'professional-link',
      'Профессиональная ссылка',
      hasProfessionalLink
        ? 'Найдена ссылка на профиль или портфолио.'
        : 'Добавьте LinkedIn, GitHub или ссылку на портфолио.',
      CHECK_WEIGHTS.link,
      hasProfessionalLink ? 'passed' : 'warning',
    ),
  ];
};

const getSectionChecks = (lines: string[]): AtsAuditCheckType[] => {
  const sections = {
    education: hasSection(lines, SECTION_HEADINGS.education),
    experience: hasSection(lines, SECTION_HEADINGS.experience),
    skills: hasSection(lines, SECTION_HEADINGS.skills),
    summary: hasSection(lines, SECTION_HEADINGS.summary),
  };

  return [
    createCheck(
      'summary-section',
      'Профессиональный профиль',
      sections.summary
        ? 'Раздел профиля имеет стандартный заголовок.'
        : 'Добавьте раздел «Профиль» или «Summary» со стандартным заголовком.',
      CHECK_WEIGHTS.summary,
      sections.summary ? 'passed' : 'warning',
    ),
    createCheck(
      'experience-section',
      'Опыт работы',
      sections.experience
        ? 'Раздел опыта имеет стандартный заголовок.'
        : 'Добавьте раздел «Опыт работы» или «Work Experience».',
      CHECK_WEIGHTS.experience,
      sections.experience ? 'passed' : 'failed',
    ),
    createCheck(
      'skills-section',
      'Навыки',
      sections.skills
        ? 'Раздел навыков имеет стандартный заголовок.'
        : 'Добавьте отдельный раздел «Навыки» или «Skills».',
      CHECK_WEIGHTS.skills,
      sections.skills ? 'passed' : 'failed',
    ),
    createCheck(
      'education-section',
      'Образование',
      sections.education
        ? 'Раздел образования имеет стандартный заголовок.'
        : 'Добавьте раздел «Образование» или «Education», если он применим.',
      CHECK_WEIGHTS.education,
      sections.education ? 'passed' : 'warning',
    ),
  ];
};

const getStructureChecks = (resumeText: string, lines: string[]): AtsAuditCheckType[] => {
  const yearsCount = new Set(resumeText.match(YEAR_REGEX) ?? []).size;
  const bulletsCount = lines.filter((line) => BULLET_REGEX.test(line)).length;
  const metricsCount = lines.filter((line) => METRIC_REGEX.test(line)).length;

  const datesStatus: AtsAuditCheckStatusType = yearsCount >= 2 ? 'passed' : yearsCount === 1 ? 'warning' : 'failed';
  const bulletsStatus: AtsAuditCheckStatusType = bulletsCount >= 3 ? 'passed' : bulletsCount > 0 ? 'warning' : 'failed';
  const metricsStatus: AtsAuditCheckStatusType = metricsCount >= 3 ? 'passed' : metricsCount > 0 ? 'warning' : 'failed';

  return [
    createCheck(
      'dates',
      'Даты',
      yearsCount >= 2
        ? `Разных значений года: ${yearsCount}.`
        : 'Используйте явные годы или диапазоны дат для опыта и образования.',
      CHECK_WEIGHTS.dates,
      datesStatus,
    ),
    createCheck(
      'bullets',
      'Пункты опыта',
      bulletsCount >= 3
        ? `Пунктов списка: ${bulletsCount}.`
        : 'Оформите обязанности и достижения маркированным списком.',
      CHECK_WEIGHTS.bullets,
      bulletsStatus,
    ),
    createCheck(
      'metrics',
      'Измеримые результаты',
      metricsCount >= 3
        ? `Строк с измеримыми результатами: ${metricsCount}.`
        : 'Добавьте проценты, объёмы, количество проектов или пользователей.',
      CHECK_WEIGHTS.metrics,
      metricsStatus,
    ),
  ];
};

const getLengthCheck = (resumeText: string): AtsAuditCheckType => {
  const wordsCount = resumeText.match(WORD_REGEX)?.length ?? 0;
  const isRecommendedLength = wordsCount >= 250 && wordsCount <= 1200;
  const isAcceptableLength = wordsCount >= 150 && wordsCount <= 1600;
  const status: AtsAuditCheckStatusType = isRecommendedLength ? 'passed' : isAcceptableLength ? 'warning' : 'failed';

  return createCheck(
    'length',
    'Объём резюме',
    isRecommendedLength
      ? `${wordsCount} слов — объём подходит для автоматического разбора.`
      : `${wordsCount} слов. Рекомендуемый диапазон: 250–1200 слов.`,
    CHECK_WEIGHTS.length,
    status,
  );
};

const getKeywordCheck = (resumeText: string, vacancyText: string): AtsAuditCheckType => {
  if (!vacancyText.trim()) {
    return createCheck(
      'vacancy-keywords',
      'Ключевые слова вакансии',
      'Добавьте описание вакансии, чтобы включить проверку покрытия терминов.',
      CHECK_WEIGHTS.keywords,
      'skipped',
    );
  }

  const match = calculateAtsMatch(resumeText, vacancyText);
  const status: AtsAuditCheckStatusType = match.score >= 70 ? 'passed' : match.score >= 40 ? 'warning' : 'failed';

  return createCheck(
    'vacancy-keywords',
    'Ключевые слова вакансии',
    `Покрытие терминов вакансии: ${match.score}% (${match.matchedCount} из ${match.keywords.length}).`,
    CHECK_WEIGHTS.keywords,
    status,
    Math.round((match.score / 100) * CHECK_WEIGHTS.keywords),
  );
};

export const calculateAtsAudit = (resumeText: string, vacancyText: string): AtsAuditType => {
  if (!resumeText.trim()) {
    return EMPTY_AUDIT;
  }

  const lines = resumeText.split(/\r?\n/).filter((line) => line.trim());
  const checks = [
    ...getContactChecks(resumeText),
    ...getSectionChecks(lines),
    ...getStructureChecks(resumeText, lines),
    getLengthCheck(resumeText),
    getKeywordCheck(resumeText, vacancyText),
  ];
  const includedChecks = checks.filter((check) => check.status !== 'skipped');
  const earnedPoints = includedChecks.reduce((total, check) => total + check.earnedPoints, 0);
  const maxPoints = includedChecks.reduce((total, check) => total + check.maxPoints, 0);

  return {
    checks,
    failedCount: checks.filter((check) => check.status === 'failed').length,
    passedCount: checks.filter((check) => check.status === 'passed').length,
    score: maxPoints > 0 ? Math.round((earnedPoints / maxPoints) * 100) : 0,
    warningCount: checks.filter((check) => check.status === 'warning').length,
  };
};
