import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@common/constants/routes';

import { HOME_FEATURES } from '../../common/constants';
import { HomeIcon } from '../home-icon';

import styles from './HomeHero.module.scss';

export const HomeHero = () => {
  return (
    <div className={styles.homeHero}>
      <p className={styles.homeHero__badge}>
        <Sparkles aria-hidden size={14} />
        AI-анализ резюме
      </p>
      <h1 className={styles.homeHero__title}>
        Разберите резюме под конкретную роль до <span className={styles.homeHero__titleAccent}>отправки отклика</span>
      </h1>
      <p className={styles.homeHero__description}>
        AI Resume Review помогает быстро понять, насколько резюме готово к вакансии: показывает слабые места,
        недостающие ключевые слова и конкретные правки к тексту.
      </p>
      <div className={styles.homeHero__actions}>
        <Link className={styles.homeHero__primaryLink} to={APP_ROUTES.resumeAnalysis}>
          Начать анализ
        </Link>
        <Link className={styles.homeHero__secondaryLink} to={APP_ROUTES.privacy}>
          Как хранятся данные
        </Link>
      </div>
      <ul className={styles.homeHero__features}>
        {HOME_FEATURES.map(({ description, icon, title }) => (
          <li key={title} className={styles.homeHero__feature}>
            <HomeIcon name={icon} />
            <div className={styles.homeHero__featureText}>
              <h2 className={styles.homeHero__featureTitle}>{title}</h2>
              <p className={styles.homeHero__featureDescription}>{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
