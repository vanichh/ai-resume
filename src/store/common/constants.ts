import type { ModelStatusType } from '@common/types';

export const MIN_RESUME_TEXT_LENGTH = 80;

export const ANALYSIS_HISTORY_LIMIT = 8;

export const COMPARISON_VACANCY_LIMIT = 4;

export const MODEL_HINTS: Partial<Record<ModelStatusType, string>> = {
  checking: '',
  unsupported: 'Браузер не предоставляет LanguageModel API.',
  unavailable: 'Модель недоступна на этом устройстве или в текущем Chrome профиле.',
  downloadable: 'При первом анализе Chrome может скачать локальную модель.',
  downloading: 'При первом анализе Chrome может скачать локальную модель.',
};
