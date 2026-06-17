import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@common/constants/routes';

import { HOME_FEATURES } from '../../common/constants';
import { HomeIcon } from '../home-icon';

import styles from './HomeHero.module.scss';

export const HomeHero = () => {
  return (
    <div className={styles.root}>
      <p className={styles.root__badge}>
        <Sparkles aria-hidden size={14} />
        AI-анализ резюме
      </p>
      <h1 className={styles.root__title}>
        Разберите резюме под конкретную роль до <span className={styles.root__titleAccent}>отправки отклика</span>
      </h1>
      <p className={styles.root__description}>
        AI Resume Review помогает быстро понять, насколько резюме готово к вакансии: показывает слабые места,
        недостающие ключевые слова и конкретные правки к тексту.
      </p>
      <div className={styles.root__actions}>
        <Link className={styles.root__primaryLink} to={APP_ROUTES.resumeAnalysis}>
          Начать анализ
        </Link>
        <Link className={styles.root__secondaryLink} to={APP_ROUTES.privacy}>
          Как хранятся данные
        </Link>
      </div>
      <ul className={styles.root__features}>
        {HOME_FEATURES.map(({ description, icon, title }) => (
          <li key={title} className={styles.root__feature}>
            <HomeIcon name={icon} />
            <div className={styles.root__featureText}>
              <h2 className={styles.root__featureTitle}>{title}</h2>
              <p className={styles.root__featureDescription}>{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
