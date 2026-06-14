const ANALYSIS_HISTORY_DATE_FORMATTER = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  month: '2-digit',
});

export const formatAnalysisHistoryDate = (value: string): string => {
  return ANALYSIS_HISTORY_DATE_FORMATTER.format(new Date(value));
};
