import type { HomeFeatureType, HomeInfoItemType, HomePreviewStepType } from '../types';

export const HOME_FEATURES = [
  {
    icon: 'lock',
    titleKey: 'home.features.local.title',
    descriptionKey: 'home.features.local.description',
  },
  {
    icon: 'target',
    titleKey: 'home.features.target.title',
    descriptionKey: 'home.features.target.description',
  },
  {
    icon: 'send',
    titleKey: 'home.features.application.title',
    descriptionKey: 'home.features.application.description',
  },
] as const satisfies readonly HomeFeatureType[];

export const HOME_PREVIEW_STEPS = [
  {
    progress: 'high',
    score: '82/100',
    titleKey: 'home.previewSteps.profile',
  },
  {
    progress: 'medium',
    score: '74/100',
    titleKey: 'home.previewSteps.keywords',
  },
  {
    progress: 'low',
    score: '68/100',
    titleKey: 'home.previewSteps.metrics',
  },
] as const satisfies readonly HomePreviewStepType[];

export const HOME_CAPABILITIES = [
  {
    icon: 'scanSearch',
    titleKey: 'home.capabilities.analysis.title',
    descriptionKey: 'home.capabilities.analysis.description',
  },
  {
    icon: 'sparkles',
    titleKey: 'home.capabilities.recommendations.title',
    descriptionKey: 'home.capabilities.recommendations.description',
  },
  {
    icon: 'target',
    titleKey: 'home.capabilities.ats.title',
    descriptionKey: 'home.capabilities.ats.description',
  },
  {
    icon: 'languages',
    titleKey: 'home.capabilities.translation.title',
    descriptionKey: 'home.capabilities.translation.description',
  },
  {
    icon: 'gitCompare',
    titleKey: 'home.capabilities.comparison.title',
    descriptionKey: 'home.capabilities.comparison.description',
  },
  {
    icon: 'mail',
    titleKey: 'home.capabilities.coverLetter.title',
    descriptionKey: 'home.capabilities.coverLetter.description',
  },
] as const satisfies readonly HomeInfoItemType[];

export const HOME_WORKFLOW = [
  {
    icon: 'upload',
    titleKey: 'home.workflow.upload.title',
    descriptionKey: 'home.workflow.upload.description',
  },
  {
    icon: 'target',
    titleKey: 'home.workflow.target.title',
    descriptionKey: 'home.workflow.target.description',
  },
  {
    icon: 'fileText',
    titleKey: 'home.workflow.improvements.title',
    descriptionKey: 'home.workflow.improvements.description',
  },
  {
    icon: 'sparkles',
    titleKey: 'home.workflow.iterate.title',
    descriptionKey: 'home.workflow.iterate.description',
  },
] as const satisfies readonly HomeInfoItemType[];

export const HOME_USE_CASES = [
  {
    icon: 'send',
    titleKey: 'home.useCases.application.title',
    descriptionKey: 'home.useCases.application.description',
  },
  {
    icon: 'languages',
    titleKey: 'home.useCases.translation.title',
    descriptionKey: 'home.useCases.translation.description',
  },
  {
    icon: 'briefcase',
    titleKey: 'home.useCases.roleChange.title',
    descriptionKey: 'home.useCases.roleChange.description',
  },
] as const satisfies readonly HomeInfoItemType[];
