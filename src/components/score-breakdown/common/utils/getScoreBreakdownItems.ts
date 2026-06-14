import type { AtsMatchType, ResumeAdviceType } from '@common/types';
import { getResumeSectionTitle } from '@common/utils/getResumeSectionTitle';

import type { ScoreBreakdownItemType } from '../../types';

const ATS_KEYWORDS_LABEL = 'Ключевые слова ATS';

export const getScoreBreakdownItems = (
  advice: ResumeAdviceType | null,
  atsMatch: AtsMatchType,
): ScoreBreakdownItemType[] => {
  const sectionScoreItems = getSectionScoreItems(advice);
  const atsScoreItem = getAtsScoreItem(atsMatch);

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

const getAtsScoreItem = (atsMatch: AtsMatchType): ScoreBreakdownItemType | null => {
  if (atsMatch.keywords.length === 0) {
    return null;
  }

  return {
    label: ATS_KEYWORDS_LABEL,
    value: atsMatch.score,
  };
};
