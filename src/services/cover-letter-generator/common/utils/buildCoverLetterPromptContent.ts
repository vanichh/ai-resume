import {
  COVER_LETTER_COMPANY_PROMPT_INSTRUCTIONS,
  COVER_LETTER_LENGTH_PROMPT_INSTRUCTIONS,
  COVER_LETTER_TONE_PROMPT_INSTRUCTIONS,
} from '@common/constants';
import type { ResumeAdviceType } from '@common/types';

import type { CoverLetterGenerationOptionsType } from '../../types';
import { COVER_LETTER_VARIANT_SEPARATOR } from '../constants';

export const buildCoverLetterPromptContent = (
  resumeText: string,
  advice: ResumeAdviceType | null,
  targetRole: string,
  vacancyText: string,
  options: CoverLetterGenerationOptionsType,
): string => {
  return [
    'Write a cover letter in Russian for the target role or vacancy.',
    COVER_LETTER_TONE_PROMPT_INSTRUCTIONS[options.tone],
    COVER_LETTER_LENGTH_PROMPT_INSTRUCTIONS[options.length],
    COVER_LETTER_COMPANY_PROMPT_INSTRUCTIONS[options.companyType],
    `Generate ${options.variantsCount} distinct variant${options.variantsCount > 1 ? 's' : ''}.`,
    options.variantsCount > 1
      ? `Separate variants exactly with this line: ${COVER_LETTER_VARIANT_SEPARATOR}`
      : 'Return only one cover letter.',
    'Structure: greeting without a company/person name, concise body, closing line.',
    'Use only facts from the resume and analysis. If the vacancy is empty, optimize for the target role.',
    '',
    `Target role: ${targetRole || advice?.targetRole || 'Target role is not specified'}`,
    '',
    'Vacancy:',
    vacancyText || 'Vacancy text is not provided.',
    '',
    'Resume analysis:',
    advice
      ? JSON.stringify(
          {
            actions: advice.actions,
            gaps: advice.gaps,
            missingKeywords: advice.missingKeywords,
            rewrittenSummary: advice.rewrittenSummary,
            strengths: advice.strengths,
            summary: advice.summary,
          },
          null,
          2,
        )
      : 'Resume analysis is not available.',
    '',
    'Resume:',
    resumeText,
  ].join('\n');
};
