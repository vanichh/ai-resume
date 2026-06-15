import type { CoverLetterCompanyType, CoverLetterLengthType, CoverLetterToneType } from '../types';

export const COVER_LETTER_TONE_OPTIONS: Array<{
  label: string;
  promptInstruction: string;
  value: CoverLetterToneType;
}> = [
  {
    label: 'Официальный',
    promptInstruction: 'Use an official tone with restrained wording and clear professional positioning.',
    value: 'formal',
  },
  {
    label: 'Деловой',
    promptInstruction: 'Use a business tone: direct, structured, practical, and recruiter-friendly.',
    value: 'business',
  },
  {
    label: 'Дружелюбный',
    promptInstruction: 'Use a friendly professional tone without becoming casual or overfamiliar.',
    value: 'friendly',
  },
  {
    label: 'Уверенный',
    promptInstruction: 'Use a confident tone focused on ownership, impact, and fit for the role.',
    value: 'confident',
  },
  {
    label: 'Короткий',
    promptInstruction: 'Use a very concise tone with no filler and only the strongest facts.',
    value: 'short',
  },
];

export const COVER_LETTER_LENGTH_OPTIONS: Array<{
  label: string;
  promptInstruction: string;
  value: CoverLetterLengthType;
}> = [
  {
    label: 'Короткое (5-7 предложений)',
    promptInstruction: 'Length: 5-7 sentences, 2 short paragraphs plus a closing line.',
    value: 'short',
  },
  {
    label: 'Стандартное',
    promptInstruction: 'Length: 3 concise paragraphs, about 180-260 words.',
    value: 'standard',
  },
  {
    label: 'Подробное',
    promptInstruction: 'Length: 4 detailed paragraphs, about 280-380 words.',
    value: 'detailed',
  },
];

export const COVER_LETTER_COMPANY_OPTIONS: Array<{
  label: string;
  promptInstruction: string;
  value: CoverLetterCompanyType;
}> = [
  {
    label: 'Стартап',
    promptInstruction: 'Adapt the letter for a startup: speed, ownership, flexibility, product thinking.',
    value: 'startup',
  },
  {
    label: 'Банк',
    promptInstruction: 'Adapt the letter for a bank: reliability, compliance, scale, process maturity.',
    value: 'bank',
  },
  {
    label: 'Энтерпрайз',
    promptInstruction: 'Adapt the letter for enterprise: cross-team work, maintainability, architecture, quality.',
    value: 'enterprise',
  },
  {
    label: 'Продуктовая компания',
    promptInstruction: 'Adapt the letter for a product company: user value, metrics, product delivery, ownership.',
    value: 'product',
  },
  {
    label: 'Аутсорс',
    promptInstruction: 'Adapt the letter for outsourcing: communication, client context, delivery discipline.',
    value: 'outsourcing',
  },
];

export const COVER_LETTER_TONE_PROMPT_INSTRUCTIONS = Object.fromEntries(
  COVER_LETTER_TONE_OPTIONS.map((option) => [option.value, option.promptInstruction]),
) as Record<CoverLetterToneType, string>;

export const COVER_LETTER_LENGTH_PROMPT_INSTRUCTIONS = Object.fromEntries(
  COVER_LETTER_LENGTH_OPTIONS.map((option) => [option.value, option.promptInstruction]),
) as Record<CoverLetterLengthType, string>;

export const COVER_LETTER_COMPANY_PROMPT_INSTRUCTIONS = Object.fromEntries(
  COVER_LETTER_COMPANY_OPTIONS.map((option) => [option.value, option.promptInstruction]),
) as Record<CoverLetterCompanyType, string>;
