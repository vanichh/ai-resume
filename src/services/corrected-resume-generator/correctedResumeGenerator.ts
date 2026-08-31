import { i18n } from '@i18n/index';

import { DEFAULT_LANGUAGE_MODEL_OUTPUT_CODE } from '@common/constants';
import type { ResumeAdviceType } from '@common/types';

import { CORRECTED_RESUME_SYSTEM_PROMPT } from './common/constants';

export const generateCorrectedResume = async (
  resumeText: string,
  advice: ResumeAdviceType,
  targetRole: string,
  vacancyText: string,
  onDownloadProgress?: (progress: number) => void,
  onModelReady?: () => void,
): Promise<string> => {
  if (!globalThis.LanguageModel) {
    throw new Error(i18n.t('workspace.errors.languageModelUnavailable'));
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
  onModelReady?.();

  try {
    return (
      await session.prompt([
        {
          role: 'user',
          content: [
            `Target role: ${targetRole || advice.targetRole}`,
            vacancyText ? `Vacancy:\n${vacancyText}` : '',
            `Recommendations:\n${JSON.stringify(advice)}`,
            `Source resume:\n${resumeText}`,
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
