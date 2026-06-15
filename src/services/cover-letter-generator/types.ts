import type { CoverLetterCompanyType, CoverLetterLengthType, CoverLetterToneType } from '@common/types';

export type CoverLetterGenerationOptionsType = {
  companyType: CoverLetterCompanyType;
  length: CoverLetterLengthType;
  tone: CoverLetterToneType;
  variantsCount: number;
};
