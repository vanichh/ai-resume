import type { CoverLetterCompanyType, CoverLetterLengthType, CoverLetterToneType } from '@common/types';

export type CoverLetterGenerationOptionsType = {
  companyName: string;
  companyType: CoverLetterCompanyType;
  length: CoverLetterLengthType;
  sourceAnalysisId: string | null;
  tone: CoverLetterToneType;
  variantsCount: number;
};
