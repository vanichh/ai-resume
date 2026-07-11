import { DEFAULT_LANGUAGE_MODEL_OUTPUT_CODE } from '@common/constants';
import type { ResumeAdviceType } from '@common/types';

import { CORRECTED_RESUME_SYSTEM_PROMPT } from './common/constants';

export const generateCorrectedResume = async (
  resumeText: string,
  advice: ResumeAdviceType,
  targetRole: string,
  vacancyText: string,
  onDownloadProgress?: (progress: number) => void,
): Promise<string> => {
  if (!globalThis.LanguageModel) {
    throw new Error('LanguageModel API недоступен в этом браузере.');
  }

  const session = await globalThis.LanguageModel.create({
    expectedOutputs: [{ type: 'text', languages: [DEFAULT_LANGUAGE_MODEL_OUTPUT_CODE] }],
    initialPrompts: [{ role: 'system', content: CORRECTED_RESUME_SYSTEM_PROMPT }],
    monitor(monitor) {
      monitor.addEventListener('downloadprogress', (event) => {
        onDownloadProgress?.((event as ProgressEvent).loaded);
      });
    },
  });

  try {
    return (
      await session.prompt([
        {
          role: 'user',
          content: [
            `Целевая роль: ${targetRole || advice.targetRole}`,
            vacancyText ? `Вакансия:\n${vacancyText}` : '',
            `Рекомендации:\n${JSON.stringify(advice)}`,
            `Исходное резюме:\n${resumeText}`,
          ]
            .filter(Boolean)
            .join('\n\n'),
        },
      ])
    ).trim();
  } finally {
    session.destroy();
  }
};
