import {
  ChartNoAxesColumnIncreasing,
  FileCheck2,
  GitCompare,
  History,
  Languages,
  Mail,
  ShieldCheck,
} from 'lucide-react';

import { APP_ROUTES } from '@common/constants/routes';

import type { AppNavigationIconType, AppNavigationLinkType } from '../types';

export const APP_NAVIGATION_ICONS: Record<AppNavigationIconType, typeof ChartNoAxesColumnIncreasing> = {
  analysis: ChartNoAxesColumnIncreasing,
  comparison: GitCompare,
  correctedResume: FileCheck2,
  history: History,
  letter: Mail,
  privacy: ShieldCheck,
  translation: Languages,
};

export const APP_NAVIGATION_LINKS: AppNavigationLinkType[] = [
  {
    icon: 'analysis',
    labelKey: 'navigation.analysis',
    path: APP_ROUTES.resumeAnalysis,
  },
  {
    icon: 'correctedResume',
    labelKey: 'navigation.correctedResume',
    path: APP_ROUTES.correctedResume,
  },
  {
    icon: 'history',
    labelKey: 'navigation.history',
    path: APP_ROUTES.analysisHistory,
  },
  {
    icon: 'comparison',
    labelKey: 'navigation.comparison',
    path: APP_ROUTES.vacancyComparison,
  },
  {
    icon: 'letter',
    labelKey: 'navigation.coverLetter',
    path: APP_ROUTES.coverLetter,
  },
  {
    icon: 'translation',
    labelKey: 'navigation.translation',
    path: APP_ROUTES.translation,
  },
  {
    icon: 'privacy',
    labelKey: 'navigation.privacy',
    path: APP_ROUTES.privacy,
  },
];
