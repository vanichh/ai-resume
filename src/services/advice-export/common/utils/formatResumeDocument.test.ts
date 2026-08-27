import { describe, expect, it } from 'vitest';

import { formatResumeDocument } from './formatResumeDocument';

describe('formatResumeDocument', () => {
  it('creates a printable document and escapes title and resume content', () => {
    const output = formatResumeDocument('<Resume>', 'A & B\n<script>alert("x")</script>');

    expect(output).toContain('<meta charset="utf-8">');
    expect(output).toContain('<title>&lt;Resume&gt;</title>');
    expect(output).toContain('<pre>A &amp; B\n&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;</pre>');
    expect(output).not.toContain('<script>alert');
  });
});
