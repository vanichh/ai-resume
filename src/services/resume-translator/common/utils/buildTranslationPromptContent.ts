export const buildTranslationPromptContent = (
  resumeChunk: string,
  chunkIndex: number,
  chunksCount: number,
  targetLanguage: string,
  toneInstruction: string,
  isRetry: boolean,
): string => {
  return [
    `Translate resume fragment ${chunkIndex + 1} of ${chunksCount} into ${targetLanguage}.`,
    isRetry
      ? `The previous response was not a valid translation. Rewrite the entire fragment in ${targetLanguage}; do not copy Russian source sentences.`
      : '',
    toneInstruction,
    'Return only the translated fragment text.',
    'Translate every line and bullet from this fragment. Do not skip, shorten, summarize, merge, reorder, or add content.',
    'Keep headings, bullet structure, numbers, company names, product names, technical terms, URLs, emails, and phone numbers intact where appropriate.',
    '',
    resumeChunk,
  ].join('\n');
};
