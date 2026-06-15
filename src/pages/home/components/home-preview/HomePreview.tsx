import clsx from 'clsx';
import { Sparkles } from 'lucide-react';

import { HOME_PREVIEW_STEPS } from '../../common/constants';
import type { HomePreviewStepType } from '../../types';

import styles from './HomePreview.module.scss';

const HOME_PREVIEW_PROGRESS_CLASS_NAMES: Record<HomePreviewStepType['progress'], string> = {
  high: styles.homePreview__progress_high,
  low: styles.homePreview__progress_low,
  medium: styles.homePreview__progress_medium,
};

export const HomePreview = () => {
  return (
    <aside className={styles.homePreview} aria-label="Пример результата анализа">
      <div className={styles.homePreview__header}>
        <span className={styles.homePreview__label}>Оценка резюме</span>
        <strong className={styles.homePreview__score}>82/100</strong>
      </div>
      <p className={styles.homePreview__role}>Lead Frontend Developer</p>
      <ul className={styles.homePreview__steps}>
        {HOME_PREVIEW_STEPS.map(({ progress, score, title }) => (
          <li key={title} className={styles.homePreview__step}>
            <div className={styles.homePreview__stepHeader}>
              <span>{title}</span>
              <strong>{score}</strong>
            </div>
            <div className={styles.homePreview__track}>
              <span className={clsx(styles.homePreview__progress, HOME_PREVIEW_PROGRESS_CLASS_NAMES[progress])} />
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.homePreview__advice}>
        <span className={styles.homePreview__adviceIcon}>
          <Sparkles aria-hidden size={18} />
        </span>
        Усилить профиль под целевую роль, добавить больше метрик и вынести React, Next.js, FSD в верхнюю часть резюме.
      </div>
    </aside>
  );
};
