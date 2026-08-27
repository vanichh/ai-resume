import { useTranslation } from 'react-i18next';

import { CHROME_APP_URL, CHROME_DOWNLOAD_URL } from '@common/constants';

import type { UnsupportedModelActionsProps } from './types';

import styles from './UnsupportedModelActions.module.scss';

export const UnsupportedModelActions = ({ modelStatus }: UnsupportedModelActionsProps) => {
  const { t } = useTranslation();

  if (modelStatus !== 'unsupported' && modelStatus !== 'unavailable') {
    return null;
  }

  return (
    <div className={styles.root}>
      <a className={styles.root__action} href={CHROME_APP_URL}>
        {t('analysis.unsupportedModel.openChrome')}
      </a>
      <a className={styles.root__action} href={CHROME_DOWNLOAD_URL} rel="noreferrer" target="_blank">
        {t('analysis.unsupportedModel.downloadChrome')}
      </a>
    </div>
  );
};
