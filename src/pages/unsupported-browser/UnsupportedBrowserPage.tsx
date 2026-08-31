import { useState } from 'react';

import { RotateCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

import { CHROME_APP_URL, CHROME_DOWNLOAD_URL } from '@common/constants';
import { APP_ROUTES } from '@common/constants/routes';
import { Button } from '@components/ui';
import { useResumeStore } from '@store/resumeStore';

import { MODEL_STATUS_DESCRIPTION, MODEL_STATUS_TITLE } from './common/constants';
import { selectUnsupportedBrowserPageState } from './common/selectors';

import styles from './UnsupportedBrowserPage.module.scss';

export const UnsupportedBrowserPage = () => {
  const { t } = useTranslation();
  const [isCheckingModel, setIsCheckingModel] = useState(false);
  const { checkModelStatus, modelStatus } = useResumeStore(useShallow(selectUnsupportedBrowserPageState));

  const onCheckModelClick = () => {
    setIsCheckingModel(true);
    void checkModelStatus().finally(() => {
      setIsCheckingModel(false);
    });
  };

  if (modelStatus === 'available' || modelStatus === 'downloadable' || modelStatus === 'downloading') {
    return <Navigate replace to={APP_ROUTES.home} />;
  }

  return (
    <section className={styles.root}>
      <div className={styles.root__content}>
        <p className={styles.root__eyebrow}>{t('workspace.unsupported.eyebrow')}</p>
        <h1 className={styles.root__title}>{t(MODEL_STATUS_TITLE[modelStatus])}</h1>
        <p className={styles.root__description}>{t(MODEL_STATUS_DESCRIPTION[modelStatus])}</p>
        <div className={styles.root__actions}>
          <a className={styles.root__primaryLink} href={CHROME_DOWNLOAD_URL} rel="noreferrer" target="_blank">
            {t('workspace.unsupported.downloadChrome')}
          </a>
          <a className={styles.root__secondaryLink} href={CHROME_APP_URL}>
            {t('workspace.unsupported.openChrome')}
          </a>
          <Button
            className={styles.root__checkButton}
            loading={isCheckingModel}
            size="large"
            onClick={onCheckModelClick}
          >
            <RotateCw aria-hidden size={18} />
            {isCheckingModel ? t('workspace.unsupported.checking') : t('workspace.unsupported.check')}
          </Button>
        </div>
        <p className={styles.root__note}>{t('workspace.unsupported.note')}</p>
      </div>
    </section>
  );
};
