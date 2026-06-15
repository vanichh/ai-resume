import { ChartNoAxesColumnIncreasing, GitCompare, History, Languages, Mail, ShieldCheck } from 'lucide-react';

import { APP_ROUTES } from '@common/constants/routes';

import type { AppNavigationIconType, AppNavigationLinkType } from '../types';

export const APP_NAVIGATION_ICONS: Record<AppNavigationIconType, typeof ChartNoAxesColumnIncreasing> = {
  analysis: ChartNoAxesColumnIncreasing,
  comparison: GitCompare,
  history: History,
  letter: Mail,
  privacy: ShieldCheck,
  translation: Languages,
};

export const APP_NAVIGATION_LINKS: AppNavigationLinkType[] = [
  {
    icon: 'analysis',
    label: 'Анализ',
    path: APP_ROUTES.resumeAnalysis,
  },
  {
    icon: 'history',
    label: 'История',
    path: APP_ROUTES.analysisHistory,
  },
  {
    icon: 'comparison',
    label: 'Сравнение',
    path: APP_ROUTES.vacancyComparison,
  },
  {
    icon: 'letter',
    label: 'Письмо',
    path: APP_ROUTES.coverLetter,
  },
  {
    icon: 'translation',
    label: 'Перевод',
    path: APP_ROUTES.translation,
  },
  {
    icon: 'privacy',
    label: 'Приватность',
    path: APP_ROUTES.privacy,
  },
];

export const TELEGRAM_URL = 'https://t.me/vanichh';
