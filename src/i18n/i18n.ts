import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { resources } from './resources';

export const LANGUAGE_STORAGE_KEY = 'ai-resume-language';
export const SUPPORTED_LANGUAGES = ['ru', 'en'] as const;
export type SupportedLanguageType = (typeof SUPPORTED_LANGUAGES)[number];

const getInitialLanguage = (): SupportedLanguageType => {
  if (typeof window === 'undefined') {
    return 'ru';
  }

  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (storedLanguage === 'ru' || storedLanguage === 'en') {
    return storedLanguage;
  }

  return navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en';
};

void i18n.use(initReactI18next).init({
  defaultNS: 'translation',
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
  lng: getInitialLanguage(),
  resources,
  supportedLngs: SUPPORTED_LANGUAGES,
});

const updateDocumentLanguage = (language: string): void => {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.lang = language;
  document.title = i18n.t('common.appTitle');
};

updateDocumentLanguage(i18n.resolvedLanguage ?? i18n.language);

i18n.on('languageChanged', (language) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }

  updateDocumentLanguage(language);
});

export { i18n };
