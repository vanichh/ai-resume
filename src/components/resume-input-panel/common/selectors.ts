import { selectCanAnalyze } from '@store/selectors';
import type { ResumeStoreType } from '@store/types';

export const selectResumeInputPanelState = (state: ResumeStoreType) => ({
  advice: state.advice,
  analyze: state.analyze,
  canAnalyze: selectCanAnalyze(state),
  fileName: state.fileName,
  modelStatus: state.modelStatus,
  parseFile: state.parseFile,
  setTargetRole: state.setTargetRole,
  setVacancyText: state.setVacancyText,
  status: state.status,
  targetRole: state.targetRole,
  vacancyText: state.vacancyText,
});
