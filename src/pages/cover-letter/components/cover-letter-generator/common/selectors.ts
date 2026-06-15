import { selectCanGenerateCoverLetter } from '@store/selectors';
import type { ResumeStoreType } from '@store/types';

export const selectCoverLetterGeneratorState = (state: ResumeStoreType) => ({
  canGenerateCoverLetter: selectCanGenerateCoverLetter(state),
  coverLetter: state.coverLetter,
  coverLetterCompanyType: state.coverLetterCompanyType,
  coverLetterLength: state.coverLetterLength,
  coverLetterStatus: state.coverLetterStatus,
  coverLetterTone: state.coverLetterTone,
  coverLetterVariantsCount: state.coverLetterVariantsCount,
  generateCoverLetter: state.generateCoverLetter,
  setCoverLetterCompanyType: state.setCoverLetterCompanyType,
  setCoverLetterLength: state.setCoverLetterLength,
  setCoverLetterText: state.setCoverLetterText,
  setCoverLetterTone: state.setCoverLetterTone,
  setCoverLetterVariantsCount: state.setCoverLetterVariantsCount,
});
