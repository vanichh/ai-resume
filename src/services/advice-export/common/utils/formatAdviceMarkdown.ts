import type { ResumeAdviceType } from '@common/types';

export const formatAdviceMarkdown = (advice: ResumeAdviceType): string => {
  return [
    `# Рекомендации по резюме: ${advice.targetRole}`,
    '',
    `Оценка: ${advice.score}/100`,
    '',
    '## Оценки по разделам',
    ...advice.sectionScores.map(
      (sectionScore) => `- ${sectionScore.title}: ${sectionScore.score}/100 - ${sectionScore.comment}`,
    ),
    '',
    '## Краткая оценка',
    advice.summary,
    '',
    '## Новый профиль',
    advice.rewrittenSummary,
    '',
    '## До / после',
    ...advice.rewriteSuggestions.flatMap((suggestion) => [
      `- До: ${suggestion.original}`,
      `  После: ${suggestion.improved}`,
      `  Причина: ${suggestion.reason}`,
    ]),
    '',
    section('Сильные стороны', advice.strengths),
    section('Пробелы', advice.gaps),
    section('Недостающие ключевые слова', advice.missingKeywords),
    section('Правки пунктов опыта', advice.bulletImprovements),
    section('Действия', advice.actions),
  ].join('\n');
};

const section = (title: string, values: string[]): string => {
  return [`## ${title}`, ...values.map((value) => `- ${value}`), ''].join('\n');
};
