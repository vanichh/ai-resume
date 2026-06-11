import { lazy } from 'react';

export const AdviceView = lazy(() =>
  import('@components/advice-view').then((module) => ({ default: module.AdviceView })),
);
export const AnalysisHistory = lazy(() =>
  import('@components/analysis-history').then((module) => ({ default: module.AnalysisHistory })),
);
export const AtsKeywordMatcher = lazy(() =>
  import('@components/ats-keyword-matcher').then((module) => ({ default: module.AtsKeywordMatcher })),
);
export const CoverLetterGenerator = lazy(() =>
  import('@components/cover-letter-generator').then((module) => ({ default: module.CoverLetterGenerator })),
);
export const ResumeComparisonView = lazy(() =>
  import('@components/resume-comparison-view').then((module) => ({ default: module.ResumeComparisonView })),
);
export const PrivacyCenter = lazy(() =>
  import('@components/privacy-center').then((module) => ({ default: module.PrivacyCenter })),
);
export const ResumePreview = lazy(() =>
  import('@components/resume-preview').then((module) => ({ default: module.ResumePreview })),
);
export const ResumeTranslationPreview = lazy(() =>
  import('@components/resume-translation-preview').then((module) => ({ default: module.ResumeTranslationPreview })),
);
export const TranslationHistory = lazy(() =>
  import('@components/translation-history').then((module) => ({ default: module.TranslationHistory })),
);
export const VacancyComparison = lazy(() =>
  import('@components/vacancy-comparison').then((module) => ({ default: module.VacancyComparison })),
);
