import { i18n } from '@i18n/index';

import { DEFAULT_LANGUAGE_MODEL_OUTPUT_CODE } from '@common/constants';
import type { ModelStatusType, ResumeAdviceType, ResumeAnalysisStageType } from '@common/types';

import { DEFAULT_TARGET_ROLE, RESPONSE_SCHEMA, SYSTEM_PROMPT } from './common/constants';
import { parseAdvice } from './common/utils/parseAdvice';
import { prepareResumeForPrompt } from './common/utils/prepareResumeForPrompt';

export const getLanguageModelStatus = async (): Promise<ModelStatusType> => {
  if (!globalThis.LanguageModel) {
    return 'unsupported';
  }

  return globalThis.LanguageModel.availability({
    expectedOutputs: [{ type: 'text', languages: [DEFAULT_LANGUAGE_MODEL_OUTPUT_CODE] }],
  });
};

export const analyzeResume = async (
  resumeText: string,
  targetInput: string,
  onDownloadProgress?: (progress: number) => void,
  signal?: AbortSignal,
  onStageChange?: (stage: ResumeAnalysisStageType) => void,
  onModelReady?: () => void,
): Promise<ResumeAdviceType> => {
  if (!globalThis.LanguageModel) {
    throw new Error(i18n.t('workspace.errors.languageModelUnavailable'));
  }

  const target = targetInput.trim() || DEFAULT_TARGET_ROLE;
  const outputLanguage = i18n.resolvedLanguage === 'en' ? 'English' : 'Russian';
  onStageChange?.('preparing');
  const preparedResume = prepareResumeForPrompt(resumeText);

  const session = await globalThis.LanguageModel.create({
    expectedOutputs: [{ type: 'text', languages: [DEFAULT_LANGUAGE_MODEL_OUTPUT_CODE] }],
    initialPrompts: [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
    ],
    signal,
    monitor(monitor) {
      monitor.addEventListener('downloadprogress', (event) => {
        const progressEvent = event as ProgressEvent;
        onDownloadProgress?.(progressEvent.loaded);
      });
    },
  });
  onModelReady?.();

  try {
    onStageChange?.('analyzing');
    const response = await session.prompt(
      [
        {
          role: 'user',
          content: [
            `Target role or vacancy: ${target}`,
            'Analyze the resume below against this target.',
            `Write every user-facing JSON value in ${outputLanguage}.`,
            'Return only JSON matching the schema: score, targetRole, sectionScores, summary, strengths, gaps, missingKeywords, rewrittenSummary, rewriteSuggestions, bulletImprovements, actions.',
            'score: a number from 0 to 100 indicating how ready the resume is for the target.',
            'sectionScores: score Profile, Experience, Education, Skills, Keywords, and Metrics with a short actionable comment.',
            'Recommendations must apply directly to the resume text and avoid generic advice.',
            'rewriteSuggestions: provide original/improved/reason pairs for the weakest source fragments.',
            'bulletImprovements: rewrite weak experience bullets as action + impact + metric; if metrics are missing, suggest where to add them.',
            '',
            preparedResume,
          ].join('\n'),
        },
      ],
      { responseConstraint: RESPONSE_SCHEMA, signal },
    );

    onStageChange?.('formatting');
    return parseAdvice(response);
  } finally {
    session.destroy();
  }
};
