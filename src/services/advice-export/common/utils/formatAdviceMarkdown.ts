import { i18n } from '@i18n/index';

import type { ResumeAdviceType } from '@common/types';

export const formatAdviceMarkdown = (advice: ResumeAdviceType): string => {
  return [
    `# ${i18n.t('workspace.export.reportTitle', { role: advice.targetRole })}`,
    '',
    i18n.t('workspace.export.score', { score: advice.score }),
    '',
    `## ${i18n.t('workspace.export.sectionScores')}`,
    ...advice.sectionScores.map(
      (sectionScore) => `- ${sectionScore.title}: ${sectionScore.score}/100 - ${sectionScore.comment}`,
    ),
    '',
    `## ${i18n.t('workspace.export.summary')}`,
    advice.summary,
    '',
    `## ${i18n.t('workspace.export.newProfile')}`,
    advice.rewrittenSummary,
    '',
    `## ${i18n.t('workspace.export.beforeAfter')}`,
    ...advice.rewriteSuggestions.flatMap((suggestion) => [
      `- ${i18n.t('workspace.export.before')}: ${suggestion.original}`,
      `  ${i18n.t('workspace.export.after')}: ${suggestion.improved}`,
      `  ${i18n.t('workspace.export.reason')}: ${suggestion.reason}`,
    ]),
    '',
    section(i18n.t('workspace.export.strengths'), advice.strengths),
    section(i18n.t('workspace.export.gaps'), advice.gaps),
    section(i18n.t('workspace.export.missingKeywords'), advice.missingKeywords),
    section(i18n.t('workspace.export.bulletImprovements'), advice.bulletImprovements),
    section(i18n.t('workspace.export.actions'), advice.actions),
  ].join('\n');
};

const section = (title: string, values: string[]): string => {
  return [`## ${title}`, ...values.map((value) => `- ${value}`), ''].join('\n');
};
