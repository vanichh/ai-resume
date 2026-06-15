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
  description: string;
  icon: HomeIconType;
  title: string;
};

export type HomeInfoItemType = {
  description: string;
  icon: HomeIconType;
  title: string;
};

export type HomePreviewStepType = {
  progress: 'high' | 'medium' | 'low';
  score: string;
  title: string;
};
