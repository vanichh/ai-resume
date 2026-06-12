import { Gauge } from 'lucide-react';

import { useAtsMatch } from '@common/hooks/useAtsMatch';

import { CollapsibleBlock, EmptyState } from '@components/ui';

import { useResumeStore } from '@store/resumeStore';

import { getScoreBreakdownItems } from './common/utils/getScoreBreakdownItems';

import styles from './ScoreBreakdown.module.scss';

export function ScoreBreakdown() {
  const advice = useResumeStore((state) => state.advice);
  const atsMatch = useAtsMatch();

  const items = getScoreBreakdownItems(advice, atsMatch);

  return (
    <CollapsibleBlock className={styles.scoreBreakdown} title="Детализация оценки">
      {items.length > 0 ? (
        <ul className={styles.scoreBreakdown__list}>
          {items.map((item) => (
            <li className={styles.scoreBreakdown__item} key={item.label}>
              <div className={styles.scoreBreakdown__header}>
                <span>{item.label}</span>
                <strong>{item.value}/100</strong>
              </div>
              <div className={styles.scoreBreakdown__track} aria-hidden="true">
                <span className={styles.scoreBreakdown__bar} style={{ width: `${item.value}%` }} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          description="Добавьте резюме и описание вакансии, чтобы увидеть вклад ATS и качества текста."
          icon={<Gauge aria-hidden size={18} />}
          title="Детализация появится после анализа"
        />
      )}
    </CollapsibleBlock>
  );
}
