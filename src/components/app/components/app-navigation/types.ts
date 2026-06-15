import type { AppThemeType } from '@common/types';

export type AppNavigationIconType = 'analysis' | 'comparison' | 'history' | 'letter' | 'privacy' | 'translation';

export type AppNavigationLinkType = {
  icon: AppNavigationIconType;
  label: string;
  path: string;
};

export type AppNavigationLinkStateType = {
  isActive: boolean;
};

export type AppNavigationProps = {
  theme: AppThemeType;
  onThemeToggle: () => void;
};
