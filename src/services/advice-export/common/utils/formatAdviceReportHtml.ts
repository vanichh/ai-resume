import type { ResumeAdviceType } from '@common/types';

export const formatAdviceReportHtml = (advice: ResumeAdviceType): string => {
  return [
    '<!doctype html>',
    '<html lang="ru">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${escapeHtml(advice.targetRole)} resume report</title>`,
    `<style>${getReportStyles()}</style>`,
    '</head>',
    '<body>',
    '<main class="report">',
    '<section class="hero">',
    '<div>',
    '<p class="eyebrow">AI Resume Review</p>',
    `<h1>${escapeHtml(advice.targetRole)}</h1>`,
    '</div>',
    `<strong class="score">${advice.score}/100</strong>`,
    '</section>',
    reportSection('Краткая оценка', `<p>${escapeHtml(advice.summary)}</p>`),
    reportSection('Оценки по разделам', formatSectionScores(advice)),
    reportSection('Новый профиль', `<p>${escapeHtml(advice.rewrittenSummary)}</p>`),
    reportSection('До / после', formatRewriteSuggestions(advice)),
    reportSection('Сильные стороны', formatList(advice.strengths)),
    reportSection('Пробелы', formatList(advice.gaps)),
    reportSection('Недостающие ключевые слова', formatTags(advice.missingKeywords)),
    reportSection('Правки пунктов опыта', formatList(advice.bulletImprovements)),
    reportSection('Действия', formatList(advice.actions)),
    '</main>',
    '</body>',
    '</html>',
  ].join('');
};

const reportSection = (title: string, content: string): string => {
  return `<section class="section"><h2>${escapeHtml(title)}</h2>${content}</section>`;
};

const formatSectionScores = (advice: ResumeAdviceType): string => {
  return `<div class="scoreGrid">${advice.sectionScores
    .map(
      (sectionScore) =>
        `<article class="scoreCard"><div><h3>${escapeHtml(sectionScore.title)}</h3><p>${escapeHtml(
          sectionScore.comment,
        )}</p></div><strong>${sectionScore.score}/100</strong></article>`,
    )
    .join('')}</div>`;
};

const formatRewriteSuggestions = (advice: ResumeAdviceType): string => {
  return `<div class="rewriteList">${advice.rewriteSuggestions
    .map(
      (suggestion) =>
        `<article class="rewriteItem"><h3>Исходный фрагмент</h3><p>${escapeHtml(
          suggestion.original,
        )}</p><h3>Улучшенный вариант</h3><p>${escapeHtml(suggestion.improved)}</p><p class="note">${escapeHtml(
          suggestion.reason,
        )}</p></article>`,
    )
    .join('')}</div>`;
};

const formatList = (values: string[]): string => {
  return `<ul>${values.map((value) => `<li>${escapeHtml(value)}</li>`).join('')}</ul>`;
};

const formatTags = (values: string[]): string => {
  return `<div class="tags">${values.map((value) => `<span>${escapeHtml(value)}</span>`).join('')}</div>`;
};

const escapeHtml = (value: string): string => {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
};

const getReportStyles = (): string => {
  return `
    @page { margin: 18mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: #111827;
      background: #f3f6fb;
      font-family: Arial, sans-serif;
      line-height: 1.5;
    }
    .report {
      max-width: 920px;
      margin: 0 auto;
      padding: 32px;
      background: #ffffff;
    }
    .hero {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 24px;
      padding-bottom: 22px;
      border-bottom: 2px solid #e5e7eb;
    }
    .eyebrow {
      margin: 0 0 8px;
      color: #5d6f86;
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
    }
    h1, h2, h3, p { margin-top: 0; }
    h1 { margin-bottom: 0; font-size: 28px; line-height: 1.15; }
    h2 { margin-bottom: 12px; font-size: 18px; }
    h3 { margin-bottom: 6px; font-size: 13px; }
    p, li { color: #253348; font-size: 14px; }
    ul { margin: 0; padding-left: 18px; }
    li + li { margin-top: 6px; }
    .score {
      flex: 0 0 auto;
      padding: 10px 14px;
      border-radius: 8px;
      color: #ffffff;
      background: #165bd8;
      font-size: 24px;
    }
    .section {
      padding: 20px 0;
      border-bottom: 1px solid #e5e7eb;
      break-inside: avoid;
    }
    .scoreGrid, .rewriteList {
      display: grid;
      gap: 10px;
    }
    .scoreCard {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 16px;
      padding: 12px;
      border: 1px solid #d9e0ea;
      border-radius: 8px;
    }
    .scoreCard p, .rewriteItem p { margin-bottom: 0; }
    .scoreCard strong { color: #165bd8; }
    .rewriteItem {
      padding: 12px;
      border: 1px solid #d9e0ea;
      border-radius: 8px;
      break-inside: avoid;
    }
    .rewriteItem h3:not(:first-child) { margin-top: 12px; }
    .note {
      margin-top: 10px;
      color: #5d6f86;
      font-style: italic;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .tags span {
      padding: 5px 8px;
      border-radius: 999px;
      color: #24405f;
      background: #eef4ff;
      font-size: 12px;
      font-weight: 800;
    }
    @media print {
      body { background: #ffffff; }
      .report { max-width: none; padding: 0; }
    }
  `;
};
