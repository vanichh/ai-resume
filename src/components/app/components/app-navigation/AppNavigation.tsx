import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { APP_NAVIGATION_LINKS, TELEGRAM_URL } from './common/constants';

import { TelegramIcon } from './components/telegram-icon';

import type { AppNavigationLinkStateType } from './types';

import styles from './AppNavigation.module.scss';

export const AppNavigation = () => {
  const getLinkClassName = ({ isActive }: AppNavigationLinkStateType) => {
    return clsx(styles.appNavigation__link, {
      [styles.appNavigation__link_active]: isActive,
    });
  };

  return (
    <nav className={styles.appNavigation} aria-label="Основная навигация">
      <div className={styles.appNavigation__inner}>
        {APP_NAVIGATION_LINKS.map(({ label, path }) => (
          <NavLink key={path} className={getLinkClassName} to={path}>
            {label}
          </NavLink>
        ))}
        <a className={styles.appNavigation__telegramLink} href={TELEGRAM_URL} rel="noreferrer" target="_blank">
          <TelegramIcon className={styles.appNavigation__telegramIcon} />
          @vanichh
        </a>
      </div>
    </nav>
  );
};
