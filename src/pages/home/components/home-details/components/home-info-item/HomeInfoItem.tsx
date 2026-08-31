import { HomeIcon } from '@pages/home/components/home-icon';
import { useTranslation } from 'react-i18next';

import type { HomeInfoItemProps } from './types';

import styles from './HomeInfoItem.module.scss';

export const HomeInfoItem = ({ item }: HomeInfoItemProps) => {
  const { t } = useTranslation();
  const { descriptionKey, icon, titleKey } = item;

  return (
    <li className={styles.root}>
      <HomeIcon name={icon} />
      <div className={styles.root__text}>
        <h3 className={styles.root__title}>{t(titleKey)}</h3>
        <p className={styles.root__description}>{t(descriptionKey)}</p>
      </div>
    </li>
  );
};
