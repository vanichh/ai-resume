import type { CoverLetterVariantType } from '@common/types';
import { createId } from '@common/utils/createId';

import { COVER_LETTER_VARIANT_SEPARATOR } from '../constants';

export const parseCoverLetterVariants = (text: string): CoverLetterVariantType[] => {
  return text
    .split(COVER_LETTER_VARIANT_SEPARATOR)
    .map((variantText) => variantText.trim())
    .filter(Boolean)
    .map((variantText, index) => ({
      id: createId(),
      text: variantText,
      title: `Вариант ${index + 1}`,
    }));
};
