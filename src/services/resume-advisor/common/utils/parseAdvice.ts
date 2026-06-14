import type { ResumeAdviceType } from '@common/types';

export const parseAdvice = (response: string): ResumeAdviceType => {
  const parsed = JSON.parse(response) as Partial<ResumeAdviceType>;

  if (
    typeof parsed.score !== 'number' ||
    !parsed.targetRole ||
    !Array.isArray(parsed.sectionScores) ||
    !parsed.summary ||
    !Array.isArray(parsed.strengths) ||
    !Array.isArray(parsed.gaps) ||
    !Array.isArray(parsed.missingKeywords) ||
    !parsed.rewrittenSummary ||
    !Array.isArray(parsed.rewriteSuggestions) ||
    !Array.isArray(parsed.bulletImprovements) ||
    !Array.isArray(parsed.actions)
  ) {
    throw new Error('Модель вернула неожиданный формат ответа.');
  }

  return {
    score: Math.max(0, Math.min(100, Math.round(parsed.score))),
    targetRole: parsed.targetRole,
    sectionScores: parsed.sectionScores.map((sectionScore) => ({
      title: String(sectionScore.title),
      score: Math.max(0, Math.min(100, Math.round(sectionScore.score))),
      comment: String(sectionScore.comment),
    })),
    summary: parsed.summary,
    strengths: parsed.strengths,
    gaps: parsed.gaps,
    missingKeywords: parsed.missingKeywords,
    rewrittenSummary: parsed.rewrittenSummary,
    rewriteSuggestions: parsed.rewriteSuggestions.map((suggestion) => ({
      original: String(suggestion.original),
      improved: String(suggestion.improved),
      reason: String(suggestion.reason),
    })),
    bulletImprovements: parsed.bulletImprovements,
    actions: parsed.actions,
  };
};
