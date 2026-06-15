export type AppStatusType = 'idle' | 'parsing' | 'ready' | 'analyzing' | 'translating' | 'done' | 'error';

export type AppThemeType = 'dark' | 'light';

export type LanguageModelLanguageCodeType = 'de' | 'en' | 'es' | 'fr' | 'ja';

export type ModelStatusType = 'available' | 'checking' | 'downloadable' | 'downloading' | 'unavailable' | 'unsupported';

export type ResumeTranslationLanguageType =
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

export type ResumeTranslationToneType = 'atsFriendly' | 'concise' | 'formal' | 'recruiterFriendly';

export type ResumeSectionScoreType = {
  title: string;
  score: number;
  comment: string;
};

export type ResumeRewriteSuggestionType = {
  original: string;
  improved: string;
  reason: string;
};

export type ResumeAdviceType = {
  score: number;
  targetRole: string;
  sectionScores: ResumeSectionScoreType[];
  summary: string;
  strengths: string[];
  gaps: string[];
  missingKeywords: string[];
  rewrittenSummary: string;
  rewriteSuggestions: ResumeRewriteSuggestionType[];
  bulletImprovements: string[];
  actions: string[];
};

export type ResumeAnalysisHistoryItemType = {
  id: string;
  advice: ResumeAdviceType;
  createdAt: string;
  fileName: string;
  note: string;
  resumeText: string;
  targetRole: string;
  vacancyText: string;
};

export type CoverLetterStatusType = 'idle' | 'generating' | 'done' | 'error';

export type CoverLetterType = {
  id: string;
  createdAt: string;
  targetRole: string;
  vacancyText: string;
  text: string;
};

export type VacancyComparisonStatusType = 'idle' | 'analyzing' | 'done' | 'error';

export type VacancyComparisonItemType = {
  id: string;
  advice: ResumeAdviceType | null;
  error: string;
  status: VacancyComparisonStatusType;
  title: string;
  vacancyText: string;
};

export type ResumeTranslationType = {
  id: string;
  language: ResumeTranslationLanguageType;
  tone: ResumeTranslationToneType;
  text: string;
  createdAt: string;
};

export type AtsKeywordMatchType = {
  keyword: string;
  matched: boolean;
};

export type AtsMatchType = {
  keywords: AtsKeywordMatchType[];
  matchedCount: number;
  missingCount: number;
  score: number;
};
