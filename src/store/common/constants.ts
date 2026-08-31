import type { ModelStatusType } from '@common/types';

export const MIN_RESUME_TEXT_LENGTH = 80;

export const ANALYSIS_HISTORY_LIMIT = 8;

export const COVER_LETTER_HISTORY_LIMIT = 12;

export const COMPARISON_VACANCY_LIMIT = 4;

export const MODEL_HINTS = {
  available: '',
  checking: '',
  unsupported: 'workspace.modelHints.unsupported',
  unavailable: 'workspace.modelHints.unavailable',
  downloadable: 'workspace.modelHints.downloadable',
  downloading: 'workspace.modelHints.downloading',
} as const satisfies Record<ModelStatusType, string>;
