import { TRANSLATION_CHUNK_MAX_LENGTH } from '../constants';

const splitLongLine = (line: string): string[] => {
  const chunks: string[] = [];

  for (let startIndex = 0; startIndex < line.length; startIndex += TRANSLATION_CHUNK_MAX_LENGTH) {
    chunks.push(line.slice(startIndex, startIndex + TRANSLATION_CHUNK_MAX_LENGTH));
  }

  return chunks;
};

export const splitResumeForTranslation = (resumeText: string): string[] => {
  const blocks = resumeText
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  const chunks: string[] = [];
  let currentChunk = '';

  const pushChunk = (): void => {
    if (!currentChunk.trim()) {
      return;
    }

    chunks.push(currentChunk.trim());
    currentChunk = '';
  };

  for (const block of blocks) {
    if (block.length > TRANSLATION_CHUNK_MAX_LENGTH) {
      pushChunk();

      for (const line of block.split('\n')) {
        const lineParts = line.length > TRANSLATION_CHUNK_MAX_LENGTH ? splitLongLine(line) : [line];

        for (const linePart of lineParts) {
          if (`${currentChunk}\n${linePart}`.length > TRANSLATION_CHUNK_MAX_LENGTH) {
            pushChunk();
          }

          currentChunk = currentChunk ? `${currentChunk}\n${linePart}` : linePart;
        }
      }

      continue;
    }

    const nextChunk = currentChunk ? `${currentChunk}\n\n${block}` : block;
    if (nextChunk.length > TRANSLATION_CHUNK_MAX_LENGTH) {
      pushChunk();
      currentChunk = block;
      continue;
    }

    currentChunk = nextChunk;
  }

  pushChunk();

  return chunks.length > 0 ? chunks : [resumeText];
};
