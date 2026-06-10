export const DEFAULT_TARGET_ROLE = 'роль не указана, оцени универсально для IT/knowledge work вакансий';

export const MAX_PROMPT_RESUME_LENGTH = 24000;

export const SYSTEM_PROMPT =
  'Ты senior career advisor. Анализируй резюме прагматично: конкретика, пробелы, приоритетные улучшения. Отвечай на русском.';

export const RESPONSE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    score: { type: 'number', minimum: 0, maximum: 100 },
    targetRole: { type: 'string' },
    sectionScores: {
      type: 'array',
      minItems: 4,
      maxItems: 6,
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          title: { type: 'string' },
          score: { type: 'number', minimum: 0, maximum: 100 },
          comment: { type: 'string' },
        },
        required: ['title', 'score', 'comment'],
      },
    },
    summary: { type: 'string' },
    strengths: { type: 'array', items: { type: 'string' }, minItems: 3, maxItems: 5 },
    gaps: { type: 'array', items: { type: 'string' }, minItems: 3, maxItems: 5 },
    missingKeywords: { type: 'array', items: { type: 'string' }, minItems: 3, maxItems: 10 },
    rewrittenSummary: { type: 'string' },
    rewriteSuggestions: {
      type: 'array',
      minItems: 3,
      maxItems: 5,
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          original: { type: 'string' },
          improved: { type: 'string' },
          reason: { type: 'string' },
        },
        required: ['original', 'improved', 'reason'],
      },
    },
    bulletImprovements: { type: 'array', items: { type: 'string' }, minItems: 3, maxItems: 6 },
    actions: { type: 'array', items: { type: 'string' }, minItems: 4, maxItems: 7 },
  },
  required: [
    'score',
    'targetRole',
    'sectionScores',
    'summary',
    'strengths',
    'gaps',
    'missingKeywords',
    'rewrittenSummary',
    'rewriteSuggestions',
    'bulletImprovements',
    'actions',
  ],
} as const;
