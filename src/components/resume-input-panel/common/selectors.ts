import { selectCanAnalyze, selectCanTranslate } from '@store/selectors';
import type { ResumeStoreType } from '@store/types';

export const selectResumeInputPanelState = (state: ResumeStoreType) => ({
  advice: state.advice,
  analyze: state.analyze,
  canAnalyze: selectCanAnalyze(state),
  canTranslate: selectCanTranslate(state),
  fileName: state.fileName,
  modelStatus: state.modelStatus,
  parseFile: state.parseFile,
  setTargetRole: state.setTargetRole,
  setTranslationLanguage: state.setTranslationLanguage,
  setTranslationTone: state.setTranslationTone,
  setVacancyText: state.setVacancyText,
  status: state.status,
  targetRole: state.targetRole,
  translate: state.translate,
  translationLanguage: state.translationLanguage,
  translationTone: state.translationTone,
  vacancyText: state.vacancyText,
});
