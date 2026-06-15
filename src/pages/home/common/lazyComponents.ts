import { lazy } from 'react';

export const AdviceView = lazy(() =>
  import('@components/advice-view').then((module) => ({ default: module.AdviceView })),
);

export const AtsKeywordMatcher = lazy(() =>
  import('@components/ats-keyword-matcher').then((module) => ({ default: module.AtsKeywordMatcher })),
);

export const ResumePreview = lazy(() =>
  import('@components/resume-preview').then((module) => ({ default: module.ResumePreview })),
);
