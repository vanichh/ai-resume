import { HomeIcon } from '@pages/home/components/home-icon';

import type { HomeInfoItemProps } from './types';

import styles from './HomeInfoItem.module.scss';

export const HomeInfoItem = ({ item }: HomeInfoItemProps) => {
  const { description, icon, title } = item;

  return (
    <li className={styles.homeInfoItem}>
      <HomeIcon name={icon} />
      <div className={styles.homeInfoItem__text}>
        <h3 className={styles.homeInfoItem__title}>{title}</h3>
        <p className={styles.homeInfoItem__description}>{description}</p>
      </div>
    </li>
  );
};
