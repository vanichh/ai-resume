import { useId, useState } from 'react';

import clsx from 'clsx';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { APP_ROUTES } from '@common/constants/routes';

import { APP_NAVIGATION_ICONS, APP_NAVIGATION_LINKS, TELEGRAM_URL } from './common/constants';
import { useLockDocumentScroll } from './common/hooks/useLockDocumentScroll';

import { ProjectIcon } from './components/project-icon';
import { TelegramIcon } from './components/telegram-icon';

import type { AppNavigationLinkStateType, AppNavigationLinkType, AppNavigationProps } from './types';

import styles from './AppNavigation.module.scss';

const getLinkClassName = ({ isActive }: AppNavigationLinkStateType) => {
  return clsx(styles.root__link, { [styles.root__link_active]: isActive });
};

export const AppNavigation = ({ theme, onThemeToggle }: AppNavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();
  const isDarkTheme = theme === 'dark';

  useLockDocumentScroll(isMenuOpen);

  const onMenuToggleClick = () => {
    setIsMenuOpen((currentValue) => !currentValue);
  };

  const onNavigationLinkClick = () => {
    setIsMenuOpen(false);
  };

  const renderNavigationLink = ({ icon, label, path }: AppNavigationLinkType) => {
    const Icon = APP_NAVIGATION_ICONS[icon];

    return (
      <NavLink key={path} className={getLinkClassName} to={path} onClick={onNavigationLinkClick}>
        <Icon aria-hidden size={18} />
        {label}
      </NavLink>
    );
  };

  return (
    <nav className={styles.root} aria-label="Основная навигация">
      <div className={styles.root__inner}>
        <NavLink className={styles.root__brand} to={APP_ROUTES.home} onClick={onNavigationLinkClick}>
          <span className={styles.root__brandIcon}>
            <ProjectIcon className={styles.root__projectIcon} />
          </span>
          <span className={styles.root__brandText}>
            <span className={styles.root__brandTitle}>
              AI <span className={styles.root__brandAccent}> Resume Review</span>
            </span>
            <span className={styles.root__brandSubtitle}>Анализ резюме и вакансий</span>
          </span>
        </NavLink>
        <div
          className={clsx(styles.root__menu, {
            [styles.root__menu_open]: isMenuOpen,
          })}
          id={menuId}
        >
          <div className={styles.root__links}>{APP_NAVIGATION_LINKS.map(renderNavigationLink)}</div>
        </div>
        <div className={styles.root__actions}>
          <button
            aria-label={isDarkTheme ? 'Включить светлую тему' : 'Включить темную тему'}
            aria-pressed={isDarkTheme}
            className={styles.root__themeButton}
            type="button"
            onClick={onThemeToggle}
          >
            {isDarkTheme ? <Sun aria-hidden size={18} /> : <Moon aria-hidden size={18} />}
          </button>
          <button
            aria-controls={menuId}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className={styles.root__menuButton}
            type="button"
            onClick={onMenuToggleClick}
          >
            {isMenuOpen ? <X aria-hidden size={18} /> : <Menu aria-hidden size={18} />}
          </button>
          <a
            className={styles.root__developerLink}
            href={TELEGRAM_URL}
            rel="noreferrer"
            target="_blank"
            onClick={onNavigationLinkClick}
          >
            <TelegramIcon className={styles.root__developerIcon} />
            Разработчик
          </a>
        </div>
      </div>
    </nav>
  );
};
