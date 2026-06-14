import mammoth from 'mammoth';

import { normalizeText } from './normalizeText';

export const parseDocx = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });

  return normalizeText(result.value);
};
