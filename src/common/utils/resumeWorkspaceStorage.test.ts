import { beforeEach, describe, expect, it } from 'vitest';

import {
  clearResumeWorkspace,
  getResumeWorkspaceStorageSize,
  loadResumeWorkspace,
  saveResumeWorkspace,
} from './resumeWorkspaceStorage';

const storage = new Map<string, string>();
const localStorageMock = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
};

describe('resumeWorkspaceStorage', () => {
  beforeEach(() => {
    storage.clear();
    Object.assign(globalThis, { localStorage: localStorageMock });
  });

  it('round-trips workspace data and reports serialized byte size', () => {
    const value = { resumeText: 'Resume', targetRole: 'Engineer' } as Parameters<typeof saveResumeWorkspace>[0];

    saveResumeWorkspace(value);

    expect(loadResumeWorkspace()).toEqual(value);
    expect(getResumeWorkspaceStorageSize()).toBe(new Blob([JSON.stringify(value)]).size);
  });

  it('returns an empty workspace for missing or malformed data and clears saved data', () => {
    expect(loadResumeWorkspace()).toEqual({});
    storage.set('ai-resume-workspace', '{bad json');
    expect(loadResumeWorkspace()).toEqual({});
    clearResumeWorkspace();
    expect(storage.size).toBe(0);
  });
});
