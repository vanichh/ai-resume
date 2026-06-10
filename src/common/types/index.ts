export type AppStatus = 'idle' | 'parsing' | 'ready' | 'analyzing' | 'translating' | 'done' | 'error';

export type ModelStatus = 'available' | 'checking' | 'downloadable' | 'downloading' | 'unavailable' | 'unsupported';

export type ResumeTranslationLanguage =
  | 'arabic'
  | 'bulgarian'
  | 'chineseSimplified'
  | 'chineseTraditional'
  | 'croatian'
  | 'czech'
  | 'danish'
  | 'dutch'
  | 'english'
  | 'estonian'
  | 'finnish'
  | 'french'
  | 'german'
  | 'greek'
  | 'hebrew'
  | 'hindi'
  | 'hungarian'
  | 'indonesian'
  | 'italian'
  | 'japanese'
  | 'korean'
  | 'latvian'
  | 'lithuanian'
  | 'norwegian'
  | 'polish'
  | 'portuguese'
  | 'romanian'
  | 'serbian'
  | 'slovak'
  | 'slovenian'
  | 'spanish'
  | 'swedish'
  | 'thai'
  | 'turkish'
  | 'ukrainian'
  | 'vietnamese';

export type ResumeTranslationTone = 'atsFriendly' | 'concise' | 'formal' | 'recruiterFriendly';

export type ResumeSectionScore = {
  title: string;
  score: number;
  comment: string;
};

export type ResumeRewriteSuggestion = {
  original: string;
  improved: string;
  reason: string;
};

export type ResumeAdvice = {
  score: number;
  targetRole: string;
  sectionScores: ResumeSectionScore[];
  summary: string;
  strengths: string[];
  gaps: string[];
  missingKeywords: string[];
  rewrittenSummary: string;
  rewriteSuggestions: ResumeRewriteSuggestion[];
  bulletImprovements: string[];
  actions: string[];
};

export type ResumeAnalysisHistoryItem = {
  id: string;
  advice: ResumeAdvice;
  createdAt: string;
  fileName: string;
  resumeText: string;
  targetRole: string;
  vacancyText: string;
};

export type VacancyComparisonStatus = 'idle' | 'analyzing' | 'done' | 'error';

export type VacancyComparisonItem = {
  id: string;
  advice: ResumeAdvice | null;
  error: string;
  status: VacancyComparisonStatus;
  title: string;
  vacancyText: string;
};

export type ResumeTranslation = {
  id: string;
  language: ResumeTranslationLanguage;
  tone: ResumeTranslationTone;
  text: string;
  createdAt: string;
};

export type AtsKeywordMatch = {
  keyword: string;
  matched: boolean;
};

export type AtsMatch = {
  keywords: AtsKeywordMatch[];
  matchedCount: number;
  missingCount: number;
  score: number;
};
