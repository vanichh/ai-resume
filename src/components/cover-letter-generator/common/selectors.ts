import { selectCanGenerateCoverLetter } from '@store/selectors';
import type { ResumeStoreType } from '@store/types';

export const selectCoverLetterGeneratorState = (state: ResumeStoreType) => ({
  canGenerateCoverLetter: selectCanGenerateCoverLetter(state),
  coverLetter: state.coverLetter,
  coverLetterStatus: state.coverLetterStatus,
  generateCoverLetter: state.generateCoverLetter,
  setCoverLetterText: state.setCoverLetterText,
});
