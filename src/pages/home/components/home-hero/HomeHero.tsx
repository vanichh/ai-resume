import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@common/constants/routes';

import { HOME_FEATURES } from '../../common/constants';
import { HomeIcon } from '../home-icon';

import styles from './HomeHero.module.scss';

export const HomeHero = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <p className={styles.root__badge}>
        <Sparkles aria-hidden size={14} />
        {t('home.badge')}
      </p>
      <h1 className={styles.root__title}>
        {t('home.titleBefore')} <span className={styles.root__titleAccent}>{t('home.titleAccent')}</span>
      </h1>
      <p className={styles.root__description}>{t('home.description')}</p>
      <div className={styles.root__actions}>
        <Link className={styles.root__primaryLink} to={APP_ROUTES.resumeAnalysis}>
          {t('home.start')}
        </Link>
        <Link className={styles.root__secondaryLink} to={APP_ROUTES.privacy}>
          {t('home.privacy')}
        </Link>
      </div>
      <ul className={styles.root__features}>
        {HOME_FEATURES.map(({ descriptionKey, icon, titleKey }) => (
          <li key={titleKey} className={styles.root__feature}>
            <HomeIcon name={icon} />
            <div className={styles.root__featureText}>
              <h2 className={styles.root__featureTitle}>{t(titleKey)}</h2>
              <p className={styles.root__featureDescription}>{t(descriptionKey)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
