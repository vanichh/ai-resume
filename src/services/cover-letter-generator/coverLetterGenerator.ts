import { DEFAULT_LANGUAGE_MODEL_OUTPUT_CODE } from '@common/constants';
import type { CoverLetterType, ResumeAdviceType } from '@common/types';
import { createId } from '@common/utils/createId';

import { COVER_LETTER_SYSTEM_PROMPT } from './common/constants';
import { buildCoverLetterPromptContent } from './common/utils/buildCoverLetterPromptContent';
import { normalizeCoverLetterVariantsCount } from './common/utils/normalizeCoverLetterVariantsCount';
import { parseCoverLetterVariants } from './common/utils/parseCoverLetterVariants';

import type { CoverLetterGenerationOptionsType } from './types';

export const generateCoverLetter = async (
  resumeText: string,
  advice: ResumeAdviceType | null,
  targetRole: string,
  vacancyText: string,
  options: CoverLetterGenerationOptionsType,
  onDownloadProgress?: (progress: number) => void,
): Promise<CoverLetterType> => {
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
    const normalizedOptions = {
      ...options,
      variantsCount: normalizeCoverLetterVariantsCount(options.variantsCount),
    };
    const text = await session.prompt([
      {
        role: 'user',
        content: buildCoverLetterPromptContent(resumeText, advice, targetRole, vacancyText, normalizedOptions),
      },
    ]);
    const variants = parseCoverLetterVariants(text);
    const normalizedVariants =
      variants.length > 0 ? variants : [{ id: createId(), text: text.trim(), title: 'Вариант 1' }];

    return {
      id: createId(),
      companyType: normalizedOptions.companyType,
      createdAt: new Date().toISOString(),
      length: normalizedOptions.length,
      targetRole: targetRole || advice?.targetRole || '',
      tone: normalizedOptions.tone,
      vacancyText,
      text: normalizedVariants[0]?.text ?? '',
      variants: normalizedVariants,
    };
  } finally {
    session.destroy();
  }
};
