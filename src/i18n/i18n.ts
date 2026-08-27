import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { resources } from './resources';

export const LANGUAGE_STORAGE_KEY = 'ai-resume-language';
export const SUPPORTED_LANGUAGES = ['ru', 'en'] as const;
export type SupportedLanguageType = (typeof SUPPORTED_LANGUAGES)[number];

const getInitialLanguage = (): SupportedLanguageType => {
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

document.documentElement.lang = i18n.resolvedLanguage ?? i18n.language;

i18n.on('languageChanged', (language) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  document.documentElement.lang = language;
});

export { i18n };
