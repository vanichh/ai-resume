import {
  RESUME_TRANSLATION_LANGUAGE_PROMPT_NAMES,
  RESUME_TRANSLATION_TONE_PROMPT_INSTRUCTIONS,
} from '@common/constants';
import type { ResumeTranslation, ResumeTranslationLanguage, ResumeTranslationTone } from '@common/types';
import { createId } from '@common/utils/createId';

import { TRANSLATION_SYSTEM_PROMPT } from './common/constants';
import { splitResumeForTranslation } from './common/utils/splitResumeForTranslation';

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
    const resumeChunks = splitResumeForTranslation(resumeText);
    const translatedChunks: string[] = [];

    for (const [chunkIndex, resumeChunk] of resumeChunks.entries()) {
      const text = await session.prompt([
        {
          role: 'user',
          content: [
            `Translate resume fragment ${chunkIndex + 1} of ${resumeChunks.length} into ${targetLanguage}.`,
            toneInstruction,
            'Return only the translated fragment text.',
            'Translate every line and bullet from this fragment. Do not skip, shorten, summarize, merge, reorder, or add content.',
            'Keep headings, bullet structure, numbers, company names, product names, technical terms, URLs, emails, and phone numbers intact where appropriate.',
            '',
            resumeChunk,
          ].join('\n'),
        },
      ]);

      translatedChunks.push(text.trim());
    }

    return {
      id: createId(),
      language,
      tone,
      text: translatedChunks.join('\n\n'),
      createdAt: new Date().toISOString(),
    };
  } finally {
    session.destroy();
  }
}
