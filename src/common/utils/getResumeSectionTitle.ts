type ResumeSectionKeyType = 'education' | 'experience' | 'keywords' | 'metrics' | 'skills' | 'summary';

export type ResumeSectionTitlesType = Record<ResumeSectionKeyType, string>;

const RESUME_SECTION_KEYS: Record<string, ResumeSectionKeyType> = {
  education: 'education',
  experience: 'experience',
  keywords: 'keywords',
  metrics: 'metrics',
  skills: 'skills',
  summary: 'summary',
  'ключевые слова': 'keywords',
  метрики: 'metrics',
  навыки: 'skills',
  образование: 'education',
  опыт: 'experience',
  'опыт работы': 'experience',
  профиль: 'summary',
};

export const getResumeSectionTitle = (title: string, titles: ResumeSectionTitlesType): string => {
  const sectionKey = RESUME_SECTION_KEYS[title.trim().toLocaleLowerCase()];

  return sectionKey ? titles[sectionKey] : title;
};
