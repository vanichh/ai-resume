import { MAX_PROMPT_RESUME_LENGTH } from '../constants';

export function prepareResumeForPrompt(resumeText: string): string {
  const normalized = resumeText.replace(/\n{3,}/g, '\n\n').trim();
  if (normalized.length <= MAX_PROMPT_RESUME_LENGTH) {
    return normalized;
  }

  const sections = splitIntoLikelySections(normalized);
  const prioritizedSections = sections.sort((left, right) => sectionPriority(right) - sectionPriority(left));
  const selected: string[] = [];
  let length = 0;

  for (const section of prioritizedSections) {
    const nextLength = length + section.length + 2;
    if (nextLength > MAX_PROMPT_RESUME_LENGTH) {
      continue;
    }

    selected.push(section);
    length = nextLength;
  }

  if (selected.length === 0) {
    return normalized.slice(0, MAX_PROMPT_RESUME_LENGTH);
  }

  return selected.join('\n\n');
}

function splitIntoLikelySections(text: string): string[] {
  const lines = text.split('\n');
  const sections: string[] = [];
  let current: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    const isHeading =
      trimmed.length > 0 && trimmed.length < 64 && /^[A-ZА-Я0-9][A-ZА-Яа-яA-Za-z0-9 /&.+-]+$/.test(trimmed);

    if (isHeading && current.length > 0) {
      sections.push(current.join('\n').trim());
      current = [trimmed];
    } else {
      current.push(line);
    }
  }

  if (current.length > 0) {
    sections.push(current.join('\n').trim());
  }

  return sections.filter(Boolean);
}

function sectionPriority(section: string): number {
  const lower = section.toLowerCase();
  const rules: Array<[RegExp, number]> = [
    [/(experience|work|employment|projects|опыт|работа|проекты)/, 10],
    [/(skills|tech stack|technologies|навыки|стек|технологии)/, 9],
    [/(summary|profile|about|objective|резюме|профиль|обо мне|цель)/, 8],
    [/(achievements|impact|достижения|результаты)/, 7],
    [/(education|certifications|образование|сертификаты)/, 4],
  ];

  return rules.find(([pattern]) => pattern.test(lower))?.[1] ?? 1;
}
