import { CHROME_APP_URL, CHROME_DOWNLOAD_URL } from '@common/constants';

import type { UnsupportedModelActionsProps } from './types';

import styles from './UnsupportedModelActions.module.scss';

export const UnsupportedModelActions = ({ modelStatus }: UnsupportedModelActionsProps) => {
  if (modelStatus !== 'unsupported' && modelStatus !== 'unavailable') {
    return null;
  }

  return (
    <div className={styles.root}>
      <a className={styles.root__action} href={CHROME_APP_URL}>
        Открыть в Chrome
      </a>
      <a className={styles.root__action} href={CHROME_DOWNLOAD_URL} rel="noreferrer" target="_blank">
        Скачать Chrome
      </a>
    </div>
  );
};
