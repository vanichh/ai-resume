import { selectCanCompareVacancies } from '@store/selectors';
import type { ResumeStoreType } from '@store/types';

export const selectVacancyComparisonState = (state: ResumeStoreType) => ({
  addComparisonVacancy: state.addComparisonVacancy,
  analyzeComparison: state.analyzeComparison,
  canCompare: selectCanCompareVacancies(state),
  comparisonVacancies: state.comparisonVacancies,
  removeComparisonVacancy: state.removeComparisonVacancy,
  selectComparisonVacancy: state.selectComparisonVacancy,
  setComparisonVacancyText: state.setComparisonVacancyText,
  setComparisonVacancyTitle: state.setComparisonVacancyTitle,
});
