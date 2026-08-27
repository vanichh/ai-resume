import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@common/constants/routes';

import styles from './AppFooter.module.scss';

export const AppFooter = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.root}>
      <div className={styles.root__inner}>
        <p className={styles.root__copyright}>{t('footer.copyright', { year: currentYear })}</p>
        <div className={styles.root__links}>
          <Link className={styles.root__aboutLink} to={APP_ROUTES.aboutProject}>
            {t('footer.aboutProject')}
          </Link>
        </div>
      </div>
    </footer>
  );
};
