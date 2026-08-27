import { Gauge } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useAtsAudit } from '@common/hooks/useAtsAudit';
import { CollapsibleBlock, EmptyState } from '@components/ui';
import { useResumeStore } from '@store/resumeStore';

import { getScoreBreakdownItems } from './common/utils/getScoreBreakdownItems';

import styles from './ScoreBreakdown.module.scss';

export const ScoreBreakdown = () => {
  const { t } = useTranslation();
  const advice = useResumeStore((state) => state.advice);
  const atsAudit = useAtsAudit();

  const items = getScoreBreakdownItems(advice, atsAudit, {
    atsAudit: t('analysis.scoreBreakdown.atsCompatibility'),
    sections: {
      education: t('analysis.scoreBreakdown.sections.education'),
      experience: t('analysis.scoreBreakdown.sections.experience'),
      keywords: t('analysis.scoreBreakdown.sections.keywords'),
      metrics: t('analysis.scoreBreakdown.sections.metrics'),
      skills: t('analysis.scoreBreakdown.sections.skills'),
      summary: t('analysis.scoreBreakdown.sections.summary'),
    },
  });

  return (
    <CollapsibleBlock className={styles.root} title={t('analysis.scoreBreakdown.title')}>
      {items.length > 0 ? (
        <ul className={styles.root__list}>
          {items.map((item) => (
            <li className={styles.root__item} key={item.label}>
              <div className={styles.root__header}>
                <span>{item.label}</span>
                <strong>{item.value}/100</strong>
              </div>
              <div className={styles.root__track} aria-hidden="true">
                <span className={styles.root__bar} style={{ width: `${item.value}%` }} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          description={t('analysis.scoreBreakdown.emptyDescription')}
          icon={<Gauge aria-hidden size={18} />}
          title={t('analysis.scoreBreakdown.emptyTitle')}
        />
      )}
    </CollapsibleBlock>
  );
};
