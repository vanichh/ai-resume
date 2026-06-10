import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

import { TEXT_LIKE_EXTENSIONS } from './common/constants';
import { normalizeText } from './common/utils/normalizeText';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export async function parseResumeFile(file: File): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';

  if (file.type === 'application/pdf' || extension === 'pdf') {
    return parsePdf(file);
  }

  if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || extension === 'docx') {
    return parseDocx(file);
  }

  if (file.type.startsWith('text/') || TEXT_LIKE_EXTENSIONS.has(extension)) {
    return normalizeText(await file.text());
  }

  throw new Error('Поддерживаются PDF, DOCX, TXT и MD.');
}

async function parsePdf(file: File): Promise<string> {
  const data = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const pages: string[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const text = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .filter(Boolean)
      .join(' ');

    pages.push(text);
  }

  return normalizeText(pages.join('\n\n'));
}

async function parseDocx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });

  return normalizeText(result.value);
}
