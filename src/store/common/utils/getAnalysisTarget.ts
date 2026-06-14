export const getAnalysisTarget = (targetRole: string, vacancyText: string): string => {
  return [targetRole.trim(), vacancyText.trim()].filter(Boolean).join('\n\nТекст вакансии:\n');
};
