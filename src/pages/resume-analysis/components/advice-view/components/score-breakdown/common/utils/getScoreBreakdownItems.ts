import type { AtsAuditType, ResumeAdviceType } from '@common/types';
import { getResumeSectionTitle } from '@common/utils/getResumeSectionTitle';

import type { ScoreBreakdownItemType, ScoreBreakdownLabelsType } from '../../types';

export const getScoreBreakdownItems = (
  advice: ResumeAdviceType | null,
  atsAudit: AtsAuditType,
  labels: ScoreBreakdownLabelsType,
): ScoreBreakdownItemType[] => {
  const sectionScoreItems = getSectionScoreItems(advice, labels);
  const atsScoreItem = getAtsScoreItem(atsAudit, labels.atsAudit);

  return atsScoreItem ? [...sectionScoreItems, atsScoreItem] : sectionScoreItems;
};

const getSectionScoreItems = (
  advice: ResumeAdviceType | null,
  labels: ScoreBreakdownLabelsType,
): ScoreBreakdownItemType[] => {
  if (!advice) {
    return [];
  }

  return advice.sectionScores.map((score) => ({
    label: getResumeSectionTitle(score.title, labels.sections),
    value: score.score,
  }));
};

const getAtsScoreItem = (atsAudit: AtsAuditType, label: string): ScoreBreakdownItemType | null => {
  if (atsAudit.checks.length === 0) {
    return null;
  }

  return {
    label,
    value: atsAudit.score,
  };
};
