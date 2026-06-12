import type { ResumeAdviceType, ResumeTranslationType } from '@common/types';

import { downloadFile } from './common/utils/downloadFile';
import { formatAdviceMarkdown } from './common/utils/formatAdviceMarkdown';
import { formatAdviceReportHtml } from './common/utils/formatAdviceReportHtml';
import { formatResumeDocument } from './common/utils/formatResumeDocument';

export function downloadAdviceJson(advice: ResumeAdviceType, fileName = 'resume-advice.json'): void {
  downloadFile(JSON.stringify(advice, null, 2), fileName, 'application/json');
}

export function downloadAdviceMarkdown(advice: ResumeAdviceType, fileName = 'resume-advice.md'): void {
  downloadFile(formatAdviceMarkdown(advice), fileName, 'text/markdown');
}

export function downloadAdviceReportHtml(advice: ResumeAdviceType, fileName = 'resume-advice-report.html'): void {
  downloadFile(formatAdviceReportHtml(advice), fileName, 'text/html');
}

export function downloadCoverLetterText(text: string, fileName = 'cover-letter.txt'): void {
  downloadFile(text, fileName, 'text/plain');
}

export function downloadResumeDoc(text: string, fileName = 'resume.doc'): void {
  downloadFile(formatResumeDocument('Resume', text), fileName, 'application/msword');
}

export function downloadResumePrintHtml(text: string, fileName = 'resume-print.html'): void {
  downloadFile(formatResumeDocument('Resume', text), fileName, 'text/html');
}

export function downloadTranslationMarkdown(
  translation: ResumeTranslationType,
  fileName = 'resume-translation.md',
): void {
  downloadFile(translation.text, fileName, 'text/markdown');
}

export function downloadTranslationText(translation: ResumeTranslationType, fileName = 'resume-translation.txt'): void {
  downloadFile(translation.text, fileName, 'text/plain');
}
