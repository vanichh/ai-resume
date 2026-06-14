import { DEFAULT_LANGUAGE_MODEL_OUTPUT_CODE } from '@common/constants';
import type { ModelStatusType, ResumeAdviceType } from '@common/types';

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
): Promise<ResumeAdviceType> => {
  if (!globalThis.LanguageModel) {
    throw new Error('LanguageModel API недоступен в этом браузере.');
  }

  const target = targetInput.trim() || DEFAULT_TARGET_ROLE;
  const preparedResume = prepareResumeForPrompt(resumeText);

  const session = await globalThis.LanguageModel.create({
    expectedOutputs: [{ type: 'text', languages: [DEFAULT_LANGUAGE_MODEL_OUTPUT_CODE] }],
    initialPrompts: [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
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
    const response = await session.prompt(
      [
        {
          role: 'user',
          content: [
            `Целевая роль или вакансия: ${target}`,
            'Проанализируй резюме ниже под эту цель.',
            'Верни только JSON по схеме: score, targetRole, sectionScores, summary, strengths, gaps, missingKeywords, rewrittenSummary, rewriteSuggestions, bulletImprovements, actions.',
            'score: число 0-100, насколько резюме готово под цель.',
            'sectionScores: оцени отдельные секции Профиль, Опыт, Образование, Навыки, Ключевые слова, Метрики с коротким прикладным comment.',
            'Рекомендации должны быть применимы к тексту резюме, без общих фраз.',
            'rewriteSuggestions: дай пары original/improved/reason для самых слабых исходных фрагментов резюме.',
            'bulletImprovements: перепиши слабые пункты опыта в формате action + impact + metric, если метрик нет - предложи где их добавить.',
            '',
            preparedResume,
          ].join('\n'),
        },
      ],
      { responseConstraint: RESPONSE_SCHEMA },
    );

    return parseAdvice(response);
  } finally {
    session.destroy();
  }
};
