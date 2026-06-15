import { RotateCw } from 'lucide-react';
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
  const { checkModelStatus, modelStatus } = useResumeStore(useShallow(selectUnsupportedBrowserPageState));

  const onCheckModelClick = () => {
    void checkModelStatus();
  };

  if (modelStatus === 'available' || modelStatus === 'downloadable' || modelStatus === 'downloading') {
    return <Navigate replace to={APP_ROUTES.home} />;
  }

  return (
    <section className={styles.unsupportedBrowserPage}>
      <div className={styles.unsupportedBrowserPage__content}>
        <p className={styles.unsupportedBrowserPage__eyebrow}>Локальная AI-модель недоступна</p>
        <h1 className={styles.unsupportedBrowserPage__title}>{MODEL_STATUS_TITLE[modelStatus]}</h1>
        <p className={styles.unsupportedBrowserPage__description}>{MODEL_STATUS_DESCRIPTION[modelStatus]}</p>
        <div className={styles.unsupportedBrowserPage__actions}>
          <a
            className={styles.unsupportedBrowserPage__primaryLink}
            href={CHROME_DOWNLOAD_URL}
            rel="noreferrer"
            target="_blank"
          >
            Скачать Chrome
          </a>
          <a className={styles.unsupportedBrowserPage__secondaryLink} href={CHROME_APP_URL}>
            Открыть в Chrome
          </a>
          <Button className={styles.unsupportedBrowserPage__checkButton} size="large" onClick={onCheckModelClick}>
            <RotateCw aria-hidden size={18} />
            Проверить модель
          </Button>
        </div>
        <p className={styles.unsupportedBrowserPage__note}>
          Прямой загрузки модели из приложения нет: Chrome скачивает её сам при первом обращении к LanguageModel API.
        </p>
      </div>
    </section>
  );
};
