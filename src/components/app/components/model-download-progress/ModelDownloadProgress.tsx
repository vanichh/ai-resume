import { useResumeStore } from '@store/resumeStore';

import { selectModelDownloadProgress } from './common/selectors';
import { normalizeDownloadProgress } from './common/utils/normalizeDownloadProgress';

import styles from './ModelDownloadProgress.module.scss';

export const ModelDownloadProgress = () => {
  const downloadProgress = useResumeStore(selectModelDownloadProgress);

  if (downloadProgress === null) {
    return null;
  }

  const progressValue = normalizeDownloadProgress(downloadProgress);

  return (
    <aside className={styles.modelDownloadProgress} aria-live="polite">
      <div className={styles.modelDownloadProgress__header}>
        <span className={styles.modelDownloadProgress__title}>Загрузка локальной модели</span>
        <strong className={styles.modelDownloadProgress__value}>{progressValue}%</strong>
      </div>
      <progress
        className={styles.modelDownloadProgress__bar}
        max={100}
        value={progressValue}
        aria-label="Прогресс загрузки локальной модели"
      />
    </aside>
  );
};
