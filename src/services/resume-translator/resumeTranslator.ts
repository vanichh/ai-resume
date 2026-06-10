import {
  RESUME_TRANSLATION_LANGUAGE_PROMPT_NAMES,
  RESUME_TRANSLATION_TONE_PROMPT_INSTRUCTIONS,
} from '@common/constants';
import type { ResumeTranslation, ResumeTranslationLanguage, ResumeTranslationTone } from '@common/types';
import { createId } from '@common/utils/createId';

import { TRANSLATION_SYSTEM_PROMPT } from './common/constants';

export async function translateResume(
  resumeText: string,
  language: ResumeTranslationLanguage,
  tone: ResumeTranslationTone,
  onDownloadProgress?: (progress: number) => void,
): Promise<ResumeTranslation> {
  if (!globalThis.LanguageModel) {
    throw new Error('LanguageModel API недоступен в этом браузере.');
  }

  const session = await globalThis.LanguageModel.create({
    initialPrompts: [
      {
        role: 'system',
        content: TRANSLATION_SYSTEM_PROMPT,
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
    const targetLanguage = RESUME_TRANSLATION_LANGUAGE_PROMPT_NAMES[language];
    const toneInstruction = RESUME_TRANSLATION_TONE_PROMPT_INSTRUCTIONS[tone];
    const text = await session.prompt([
      {
        role: 'user',
        content: [
          `Translate this resume into ${targetLanguage}.`,
          toneInstruction,
          'Return only the translated resume text.',
          'Keep headings, bullet structure, numbers, company names, product names, technical terms, URLs, emails, and phone numbers intact where appropriate.',
          '',
          resumeText,
        ].join('\n'),
      },
    ]);

    return {
      id: createId(),
      language,
      tone,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
  } finally {
    session.destroy();
  }
}
