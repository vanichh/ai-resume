import clsx from 'clsx';
import { Sparkles } from 'lucide-react';

import { HOME_PREVIEW_STEPS } from '../../common/constants';
import type { HomePreviewStepType } from '../../types';

import styles from './HomePreview.module.scss';

const HOME_PREVIEW_PROGRESS_CLASS_NAMES: Record<HomePreviewStepType['progress'], string> = {
  high: styles.root__progress_high,
  low: styles.root__progress_low,
  medium: styles.root__progress_medium,
};

export const HomePreview = () => {
  return (
    <aside className={styles.root} aria-label="Пример результата анализа">
      <div className={styles.root__header}>
        <span className={styles.root__label}>Оценка резюме</span>
        <strong className={styles.root__score}>82/100</strong>
      </div>
      <p className={styles.root__role}>Lead Frontend Developer</p>
      <ul className={styles.root__steps}>
        {HOME_PREVIEW_STEPS.map(({ progress, score, title }) => (
          <li key={title} className={styles.root__step}>
            <div className={styles.root__stepHeader}>
              <span>{title}</span>
              <strong>{score}</strong>
            </div>
            <div className={styles.root__track}>
              <span className={clsx(styles.root__progress, HOME_PREVIEW_PROGRESS_CLASS_NAMES[progress])} />
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.root__advice}>
        <span className={styles.root__adviceIcon}>
          <Sparkles aria-hidden size={18} />
        </span>
        Усилить профиль под целевую роль, добавить больше метрик и вынести React, Next.js, FSD в верхнюю часть резюме.
      </div>
    </aside>
  );
};
