const RESUME_SECTION_TITLES: Record<string, string> = {
  education: 'Образование',
  experience: 'Опыт',
  keywords: 'Ключевые слова',
  metrics: 'Метрики',
  skills: 'Навыки',
  summary: 'Профиль',
};

export const getResumeSectionTitle = (title: string): string => {
  return RESUME_SECTION_TITLES[title.trim().toLowerCase()] ?? title;
};
