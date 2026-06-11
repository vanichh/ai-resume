import { TEXT_LIKE_EXTENSIONS } from './common/constants';
import { normalizeText } from './common/utils/normalizeText';

export async function parseResumeFile(file: File): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';

  if (file.type === 'application/pdf' || extension === 'pdf') {
    const { parsePdf } = await import('./common/utils/parsePdf');

    return parsePdf(file);
  }

  if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || extension === 'docx') {
    const { parseDocx } = await import('./common/utils/parseDocx');

    return parseDocx(file);
  }

  if (file.type.startsWith('text/') || TEXT_LIKE_EXTENSIONS.has(extension)) {
    return normalizeText(await file.text());
  }

  throw new Error('Поддерживаются PDF, DOCX, TXT и MD.');
}
