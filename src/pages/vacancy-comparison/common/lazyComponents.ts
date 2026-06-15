import { lazy } from 'react';

export const ResumePreview = lazy(() =>
  import('@components/resume-preview').then((module) => ({ default: module.ResumePreview })),
);
