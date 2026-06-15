import { useEffect, useState } from 'react';

import { APP_THEME_STORAGE_KEY } from '@common/constants';
import type { AppThemeType } from '@common/types';

const DARK_THEME_QUERY = '(prefers-color-scheme: dark)';

const isAppTheme = (value: string | null): value is AppThemeType => {
  return value === 'dark' || value === 'light';
};

const getStoredTheme = (): AppThemeType | null => {
  try {
    const storedTheme = localStorage.getItem(APP_THEME_STORAGE_KEY);

    return isAppTheme(storedTheme) ? storedTheme : null;
  } catch {
    return null;
  }
};

const getSystemTheme = (): AppThemeType => {
  return window.matchMedia(DARK_THEME_QUERY).matches ? 'dark' : 'light';
};

const getInitialTheme = (): AppThemeType => {
  const storedTheme = getStoredTheme();

  return storedTheme ?? getSystemTheme();
};

const applyTheme = (theme: AppThemeType): void => {
  document.documentElement.dataset.theme = theme;
};

export const useAppTheme = () => {
  const [theme, setTheme] = useState<AppThemeType>(getInitialTheme);
  const [isUserThemeSelected, setIsUserThemeSelected] = useState(() => Boolean(getStoredTheme()));

  useEffect(() => {
    applyTheme(theme);

    if (!isUserThemeSelected) {
      return;
    }

    localStorage.setItem(APP_THEME_STORAGE_KEY, theme);
  }, [isUserThemeSelected, theme]);

  useEffect(() => {
    if (isUserThemeSelected) {
      return;
    }

    const mediaQuery = window.matchMedia(DARK_THEME_QUERY);

    const onSystemThemeChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', onSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', onSystemThemeChange);
    };
  }, [isUserThemeSelected]);

  const onThemeToggle = () => {
    setIsUserThemeSelected(true);
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return {
    onThemeToggle,
    theme,
  };
};
