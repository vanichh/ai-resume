type HomeFeatureTranslationKeyType = 'home.features.application' | 'home.features.local' | 'home.features.target';

type HomeInfoItemTranslationKeyType =
  | 'home.capabilities.analysis'
  | 'home.capabilities.ats'
  | 'home.capabilities.comparison'
  | 'home.capabilities.coverLetter'
  | 'home.capabilities.recommendations'
  | 'home.capabilities.translation'
  | 'home.useCases.application'
  | 'home.useCases.roleChange'
  | 'home.useCases.translation'
  | 'home.workflow.improvements'
  | 'home.workflow.iterate'
  | 'home.workflow.target'
  | 'home.workflow.upload';

export type HomeIconType =
  | 'briefcase'
  | 'fileText'
  | 'gitCompare'
  | 'languages'
  | 'lock'
  | 'mail'
  | 'scanSearch'
  | 'send'
  | 'sparkles'
  | 'target'
  | 'upload';

export type HomeFeatureType = {
  descriptionKey: `${HomeFeatureTranslationKeyType}.description`;
  icon: HomeIconType;
  titleKey: `${HomeFeatureTranslationKeyType}.title`;
};

export type HomeInfoItemType = {
  descriptionKey: `${HomeInfoItemTranslationKeyType}.description`;
  icon: HomeIconType;
  titleKey: `${HomeInfoItemTranslationKeyType}.title`;
};

export type HomePreviewStepType = {
  progress: 'high' | 'medium' | 'low';
  score: string;
  titleKey: 'home.previewSteps.keywords' | 'home.previewSteps.metrics' | 'home.previewSteps.profile';
};
