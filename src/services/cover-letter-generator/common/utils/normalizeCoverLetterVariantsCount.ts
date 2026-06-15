import { COVER_LETTER_MAX_VARIANTS_COUNT } from '../constants';

export const normalizeCoverLetterVariantsCount = (value: number): number => {
  if (!Number.isFinite(value)) {
    return 1;
  }

  return Math.min(Math.max(Math.round(value), 1), COVER_LETTER_MAX_VARIANTS_COUNT);
};
