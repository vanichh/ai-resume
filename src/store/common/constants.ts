import type { ModelStatus } from '@common/types';

export const MIN_RESUME_TEXT_LENGTH = 80;

export const MODEL_HINTS: Partial<Record<ModelStatus, string>> = {
  checking: '',
  unsupported: 'Браузер не предоставляет LanguageModel API.',
  unavailable: 'Модель недоступна на этом устройстве или в текущем Chrome профиле.',
  downloadable: 'При первом анализе Chrome может скачать локальную модель.',
  downloading: 'При первом анализе Chrome может скачать локальную модель.',
};
