import type { AppThemeType } from '@common/types';

export type AppNavigationLinkType = {
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
