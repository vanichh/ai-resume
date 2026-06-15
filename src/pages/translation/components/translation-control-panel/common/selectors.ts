import { selectCanTranslate } from '@store/selectors';
import type { ResumeStoreType } from '@store/types';

export const selectTranslationControlPanelState = (state: ResumeStoreType) => ({
  canTranslate: selectCanTranslate(state),
  fileName: state.fileName,
  modelStatus: state.modelStatus,
  parseFile: state.parseFile,
  setTranslationLanguage: state.setTranslationLanguage,
  setTranslationTone: state.setTranslationTone,
  translate: state.translate,
  translationLanguage: state.translationLanguage,
  translationTone: state.translationTone,
});
