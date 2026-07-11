import type { AppThemeType } from '@common/types';

export type AppNavigationIconType =
  | 'analysis'
  | 'comparison'
  | 'correctedResume'
  | 'history'
  | 'letter'
  | 'privacy'
  | 'translation';

export type AppNavigationLinkType = {
  icon: AppNavigationIconType;
  labelKey: `navigation.${
    | 'analysis'
    | 'comparison'
    | 'correctedResume'
    | 'coverLetter'
    | 'history'
    | 'privacy'
    | 'translation'}`;
  path: string;
};

export type AppNavigationLinkStateType = {
  isActive: boolean;
};

export type AppNavigationProps = {
  theme: AppThemeType;
  onThemeToggle: () => void;
};
