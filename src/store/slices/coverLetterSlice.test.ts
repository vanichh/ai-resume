import { beforeEach, describe, expect, it } from 'vitest';

import type { CoverLetterType } from '@common/types';

import { useResumeStore } from '../resumeStore';

const createCoverLetter = (id: string, text: string): CoverLetterType => ({
  id,
  companyName: id === 'letter-1' ? 'Acme' : 'Globex',
  companyType: id === 'letter-1' ? 'startup' : 'enterprise',
  createdAt: '2026-08-28T12:00:00.000Z',
  length: id === 'letter-1' ? 'short' : 'detailed',
  sourceAnalysisId: null,
  targetRole: id === 'letter-1' ? 'Frontend Engineer' : 'Tech Lead',
  text,
  tone: id === 'letter-1' ? 'friendly' : 'formal',
  vacancyText: `${id} vacancy`,
  variants: [{ id: `${id}-variant`, text, title: 'Variant 1' }],
});

describe('coverLetterSlice', () => {
  const firstLetter = createCoverLetter('letter-1', 'First letter');
  const secondLetter = createCoverLetter('letter-2', 'Second letter');

  beforeEach(() => {
    Object.assign(globalThis, {
      localStorage: {
        getItem: () => null,
        removeItem: () => undefined,
        setItem: () => undefined,
      },
    });
    useResumeStore.setState({
      coverLetter: firstLetter,
      coverLetterHistory: [firstLetter, secondLetter],
      coverLetterStatus: 'done',
    });
  });

  it('updates the active letter and its saved history item', () => {
    useResumeStore.getState().setCoverLetterText('Edited letter');

    const state = useResumeStore.getState();
    expect(state.coverLetter?.text).toBe('Edited letter');
    expect(state.coverLetterHistory[0]?.text).toBe('Edited letter');
    expect(state.coverLetterHistory[0]?.variants[0]?.text).toBe('Edited letter');
  });

  it('selects a saved letter with its generation settings and removes the active item', () => {
    useResumeStore.getState().selectCoverLetter(secondLetter.id);

    expect(useResumeStore.getState()).toMatchObject({
      coverLetter: secondLetter,
      coverLetterCompanyName: secondLetter.companyName,
      coverLetterCompanyType: secondLetter.companyType,
      coverLetterLength: secondLetter.length,
      coverLetterTone: secondLetter.tone,
      targetRole: secondLetter.targetRole,
      vacancyText: secondLetter.vacancyText,
    });

    useResumeStore.getState().removeCoverLetter(secondLetter.id);

    expect(useResumeStore.getState().coverLetter).toBeNull();
    expect(useResumeStore.getState().coverLetterHistory).toEqual([firstLetter]);
    expect(useResumeStore.getState().coverLetterStatus).toBe('idle');
  });
});
