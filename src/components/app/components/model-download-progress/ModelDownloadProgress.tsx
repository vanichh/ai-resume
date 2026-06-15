import clsx from 'clsx';

import { useResumeStore } from '@store/resumeStore';

import { selectModelDownloadProgress } from './common/selectors';
import { normalizeDownloadProgress } from './common/utils/normalizeDownloadProgress';

import type { ModelDownloadProgressProps } from './types';

import styles from './ModelDownloadProgress.module.scss';

export const ModelDownloadProgress = ({ layout = 'wide' }: ModelDownloadProgressProps) => {
  const downloadProgress = useResumeStore(selectModelDownloadProgress);

  if (downloadProgress === null) {
    return null;
  }

  const progressValue = normalizeDownloadProgress(downloadProgress);
  const isNarrowLayout = layout === 'narrow';

  return (
    <aside
      className={clsx(styles.modelDownloadProgress, {
        [styles.modelDownloadProgress_narrow]: isNarrowLayout,
      })}
      aria-live="polite"
    >
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
