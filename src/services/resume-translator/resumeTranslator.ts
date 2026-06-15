import {
  DEFAULT_LANGUAGE_MODEL_OUTPUT_CODE,
  RESUME_TRANSLATION_LANGUAGE_MODEL_OUTPUT_CODES,
  RESUME_TRANSLATION_LANGUAGE_PROMPT_NAMES,
  RESUME_TRANSLATION_TONE_PROMPT_INSTRUCTIONS,
} from '@common/constants';
import type { ResumeTranslationLanguageType, ResumeTranslationToneType, ResumeTranslationType } from '@common/types';
import { createId } from '@common/utils/createId';

import {
  TRANSLATION_MAX_ATTEMPTS,
  TRANSLATION_SYSTEM_PROMPT,
  UNCHANGED_TRANSLATION_ERROR_MESSAGE,
} from './common/constants';
import { buildTranslationPromptContent } from './common/utils/buildTranslationPromptContent';
import { isTranslationLikelyUnchanged } from './common/utils/isTranslationLikelyUnchanged';
import { splitResumeForTranslation } from './common/utils/splitResumeForTranslation';

export const translateResume = async (
  resumeText: string,
  language: ResumeTranslationLanguageType,
  tone: ResumeTranslationToneType,
  onDownloadProgress?: (progress: number) => void,
): Promise<ResumeTranslationType> => {
  if (!globalThis.LanguageModel) {
    throw new Error('LanguageModel API недоступен в этом браузере.');
  }

  const session = await globalThis.LanguageModel.create({
    expectedOutputs: [
      {
        type: 'text',
        languages: [RESUME_TRANSLATION_LANGUAGE_MODEL_OUTPUT_CODES[language] ?? DEFAULT_LANGUAGE_MODEL_OUTPUT_CODE],
      },
    ],
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
      let translatedChunk = '';

      for (let attemptIndex = 0; attemptIndex < TRANSLATION_MAX_ATTEMPTS; attemptIndex += 1) {
        const text = await session.prompt([
          {
            role: 'user',
            content: buildTranslationPromptContent(
              resumeChunk,
              chunkIndex,
              resumeChunks.length,
              targetLanguage,
              toneInstruction,
              attemptIndex > 0,
            ),
          },
        ]);

        translatedChunk = text.trim();

        if (!isTranslationLikelyUnchanged(resumeChunk, translatedChunk, language)) {
          break;
        }
      }

      if (isTranslationLikelyUnchanged(resumeChunk, translatedChunk, language)) {
        throw new Error(UNCHANGED_TRANSLATION_ERROR_MESSAGE);
      }

      translatedChunks.push(translatedChunk);
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
};
