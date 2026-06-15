import { APP_ROUTES } from '@common/constants/routes';

export const APP_NAVIGATION_LINKS = [
  {
    label: 'Анализ',
    path: APP_ROUTES.home,
  },
  {
    label: 'История',
    path: APP_ROUTES.analysisHistory,
  },
  {
    label: 'Сравнение',
    path: APP_ROUTES.vacancyComparison,
  },
  {
    label: 'Письмо',
    path: APP_ROUTES.coverLetter,
  },
  {
    label: 'Перевод',
    path: APP_ROUTES.translation,
  },
  {
    label: 'Приватность',
    path: APP_ROUTES.privacy,
  },
] as const;

export const TELEGRAM_URL = 'https://t.me/vanichh';
