import type { AppStatusType } from '@common/types';

export const STATUS_LABELS: Record<AppStatusType, string> = {
  idle: 'Загрузите резюме',
  parsing: 'Читаю файл',
  ready: 'Готово к анализу',
  analyzing: 'Анализирую',
  translating: 'Перевожу',
  done: 'Рекомендации готовы',
  error: 'Нужна правка',
};

export const RESUME_FILE_ACCEPT =
  '.pdf,.docx,.txt,.md,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
