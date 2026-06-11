import type { AtsMatch, ResumeAdvice } from '@common/types';
import { getResumeSectionTitle } from '@common/utils/getResumeSectionTitle';

import type { ScoreBreakdownItem } from '../../types';

const ATS_KEYWORDS_LABEL = 'Ключевые слова ATS';

export function getScoreBreakdownItems(advice: ResumeAdvice | null, atsMatch: AtsMatch): ScoreBreakdownItem[] {
  const sectionScoreItems = getSectionScoreItems(advice);
  const atsScoreItem = getAtsScoreItem(atsMatch);

  return atsScoreItem ? [...sectionScoreItems, atsScoreItem] : sectionScoreItems;
}

function getSectionScoreItems(advice: ResumeAdvice | null): ScoreBreakdownItem[] {
  if (!advice) {
    return [];
  }

  return advice.sectionScores.map((score) => ({
    label: getResumeSectionTitle(score.title),
    value: score.score,
  }));
}

function getAtsScoreItem(atsMatch: AtsMatch): ScoreBreakdownItem | null {
  if (atsMatch.keywords.length === 0) {
    return null;
  }

  return {
    label: ATS_KEYWORDS_LABEL,
    value: atsMatch.score,
  };
}
