import { DEFAULT_LANGUAGE_MODEL_OUTPUT_CODE } from '@common/constants';
import type { CoverLetterType, ResumeAdviceType } from '@common/types';
import { createId } from '@common/utils/createId';

import { COVER_LETTER_SYSTEM_PROMPT } from './common/constants';

export async function generateCoverLetter(
  resumeText: string,
  advice: ResumeAdviceType | null,
  targetRole: string,
  vacancyText: string,
  onDownloadProgress?: (progress: number) => void,
): Promise<CoverLetterType> {
  if (!globalThis.LanguageModel) {
    throw new Error('LanguageModel API недоступен в этом браузере.');
  }

  const session = await globalThis.LanguageModel.create({
    expectedOutputs: [{ type: 'text', languages: [DEFAULT_LANGUAGE_MODEL_OUTPUT_CODE] }],
    initialPrompts: [
      {
        role: 'system',
        content: COVER_LETTER_SYSTEM_PROMPT,
      },
    ],
    monitor(monitor) {
      monitor.addEventListener('downloadprogress', (event) => {
        const progressEvent = event as ProgressEvent;
        onDownloadProgress?.(progressEvent.loaded);
      });
    },
  });

  try {
    const text = await session.prompt([
      {
        role: 'user',
        content: [
          'Write a cover letter in Russian for the target role or vacancy.',
          'Length: 180-260 words.',
          'Tone: professional, direct, recruiter-friendly.',
          'Structure: greeting without a company/person name, 3 concise paragraphs, closing line.',
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
        ].join('\n'),
      },
    ]);

    return {
      id: createId(),
      createdAt: new Date().toISOString(),
      targetRole: targetRole || advice?.targetRole || '',
      vacancyText,
      text: text.trim(),
    };
  } finally {
    session.destroy();
  }
}
