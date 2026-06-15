import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { APP_ROUTES } from '@common/constants/routes';

import styles from './AppNavigation.module.scss';

type AppNavigationLinkStateType = {
  isActive: boolean;
};

export const AppNavigation = () => {
  const getLinkClassName = ({ isActive }: AppNavigationLinkStateType) => {
    return clsx(styles.appNavigation__link, {
      [styles.appNavigation__link_active]: isActive,
    });
  };

  return (
    <nav className={styles.appNavigation} aria-label="Основная навигация">
      <NavLink className={getLinkClassName} to={APP_ROUTES.home}>
        Анализ
      </NavLink>
      <NavLink className={getLinkClassName} to={APP_ROUTES.analysisHistory}>
        История
      </NavLink>
      <NavLink className={getLinkClassName} to={APP_ROUTES.vacancyComparison}>
        Сравнение
      </NavLink>
      <NavLink className={getLinkClassName} to={APP_ROUTES.coverLetter}>
        Письмо
      </NavLink>
      <NavLink className={getLinkClassName} to={APP_ROUTES.translation}>
        Перевод
      </NavLink>
      <NavLink className={getLinkClassName} to={APP_ROUTES.privacy}>
        Приватность
      </NavLink>
    </nav>
  );
};
