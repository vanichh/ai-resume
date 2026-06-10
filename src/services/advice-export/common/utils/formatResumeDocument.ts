export function formatResumeDocument(title: string, text: string): string {
  return [
    '<!doctype html>',
    '<html>',
    '<head>',
    '<meta charset="utf-8">',
    `<title>${escapeHtml(title)}</title>`,
    '<style>body{font-family:Arial,sans-serif;line-height:1.5;color:#111827;padding:32px;}pre{white-space:pre-wrap;font-family:inherit;}</style>',
    '</head>',
    '<body>',
    `<h1>${escapeHtml(title)}</h1>`,
    `<pre>${escapeHtml(text)}</pre>`,
    '</body>',
    '</html>',
  ].join('');
}

function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}
