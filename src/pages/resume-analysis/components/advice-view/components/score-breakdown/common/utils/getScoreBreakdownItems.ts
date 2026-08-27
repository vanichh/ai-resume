import type { AtsAuditType, ResumeAdviceType } from '@common/types';
import { getResumeSectionTitle } from '@common/utils/getResumeSectionTitle';

import type { ScoreBreakdownItemType } from '../../types';

const ATS_AUDIT_LABEL = 'ATS-совместимость';

export const getScoreBreakdownItems = (
  advice: ResumeAdviceType | null,
  atsAudit: AtsAuditType,
): ScoreBreakdownItemType[] => {
  const sectionScoreItems = getSectionScoreItems(advice);
  const atsScoreItem = getAtsScoreItem(atsAudit);

  return atsScoreItem ? [...sectionScoreItems, atsScoreItem] : sectionScoreItems;
};

const getSectionScoreItems = (advice: ResumeAdviceType | null): ScoreBreakdownItemType[] => {
  if (!advice) {
    return [];
  }

  return advice.sectionScores.map((score) => ({
    label: getResumeSectionTitle(score.title),
    value: score.score,
  }));
};

const getAtsScoreItem = (atsAudit: AtsAuditType): ScoreBreakdownItemType | null => {
  if (atsAudit.checks.length === 0) {
    return null;
  }

  return {
    label: ATS_AUDIT_LABEL,
    value: atsAudit.score,
  };
};
