import type { ResumeStoreType } from '@store/types';

export const selectCoverLetterHistoryState = (state: ResumeStoreType) => ({
  activeId: state.coverLetter?.id,
  history: state.coverLetterHistory,
  removeCoverLetter: state.removeCoverLetter,
  selectCoverLetter: state.selectCoverLetter,
});
