import { BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { getResumeSectionTitle } from '@common/utils/getResumeSectionTitle';
import { CollapsibleBlock, EmptyState } from '@components/ui';

import type { SectionScoreListProps } from './types';

import styles from './SectionScoreList.module.scss';

export const SectionScoreList = ({ scores }: SectionScoreListProps) => {
  const { t } = useTranslation();
  const sectionTitles = {
    education: t('analysis.scoreBreakdown.sections.education'),
    experience: t('analysis.scoreBreakdown.sections.experience'),
    keywords: t('analysis.scoreBreakdown.sections.keywords'),
    metrics: t('analysis.scoreBreakdown.sections.metrics'),
    skills: t('analysis.scoreBreakdown.sections.skills'),
    summary: t('analysis.scoreBreakdown.sections.summary'),
  };

  return (
    <CollapsibleBlock className={styles.root} title={t('analysis.sectionScores.title')}>
      {scores.length > 0 ? (
        <ul className={styles.root__list}>
          {scores.map((score) => (
            <li className={styles.root__item} key={score.title}>
              <div className={styles.root__header}>
                <span className={styles.root__name}>{getResumeSectionTitle(score.title, sectionTitles)}</span>
                <strong className={styles.root__value}>{score.score}/100</strong>
              </div>
              <div className={styles.root__track} aria-hidden="true">
                <span className={styles.root__bar} style={{ width: `${score.score}%` }} />
              </div>
              <p className={styles.root__comment}>{score.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          description={t('analysis.sectionScores.emptyDescription')}
          icon={<BarChart3 aria-hidden size={18} />}
          title={t('analysis.sectionScores.emptyTitle')}
        />
      )}
    </CollapsibleBlock>
  );
};
