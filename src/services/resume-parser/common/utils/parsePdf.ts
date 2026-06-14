import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

import { normalizeText } from './normalizeText';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const parsePdf = async (file: File): Promise<string> => {
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
};
