import type { AppStatus } from '@common/types';

export const STATUS_LABELS: Record<AppStatus, string> = {
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

export const CHROME_DOWNLOAD_URL = 'https://www.google.com/chrome/';

export const CHROME_APP_URL = 'googlechrome://';
