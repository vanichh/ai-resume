import { HOME_ICON_COMPONENTS } from './common/constants';

import type { HomeIconProps } from './types';

import styles from './HomeIcon.module.scss';

export const HomeIcon = ({ name, size = 18 }: HomeIconProps) => {
  const Icon = HOME_ICON_COMPONENTS[name];

  return (
    <span className={styles.root}>
      <Icon aria-hidden size={size} />
    </span>
  );
};
