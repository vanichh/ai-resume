import { HomeIcon } from '@pages/home/components/home-icon';

import type { HomeInfoItemProps } from './types';

import styles from './HomeInfoItem.module.scss';

export const HomeInfoItem = ({ item }: HomeInfoItemProps) => {
  const { description, icon, title } = item;

  return (
    <li className={styles.root}>
      <HomeIcon name={icon} />
      <div className={styles.root__text}>
        <h3 className={styles.root__title}>{title}</h3>
        <p className={styles.root__description}>{description}</p>
      </div>
    </li>
  );
};
