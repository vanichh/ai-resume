import { lazy } from 'react';

export const ResumeComparisonView = lazy(() =>
  import('../components/resume-comparison-view').then((module) => ({ default: module.ResumeComparisonView })),
);

export const ResumePreview = lazy(() =>
  import('@components/resume-preview').then((module) => ({ default: module.ResumePreview })),
);

export const ResumeTranslationPreview = lazy(() =>
  import('../components/resume-translation-preview').then((module) => ({ default: module.ResumeTranslationPreview })),
);

export const TranslationHistory = lazy(() =>
  import('../components/translation-history').then((module) => ({ default: module.TranslationHistory })),
);
