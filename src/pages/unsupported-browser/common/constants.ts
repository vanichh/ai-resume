import type { ModelStatusType } from '@common/types';

export const MODEL_STATUS_TITLE: Record<ModelStatusType, string> = {
  available: 'Модель доступна',
  checking: 'Проверяем поддержку браузера',
  downloadable: 'Chrome готов скачать модель',
  downloading: 'Chrome скачивает модель',
  unavailable: 'Модель недоступна в текущем Chrome',
  unsupported: 'Нужен Chrome с LanguageModel API',
};

export const MODEL_STATUS_DESCRIPTION: Record<ModelStatusType, string> = {
  available: 'Можно вернуться к работе с резюме.',
  checking: 'Подождите несколько секунд или запустите повторную проверку.',
  downloadable: 'Откройте приложение в поддерживаемом Chrome и запустите анализ: браузер сам начнет загрузку модели.',
  downloading: 'Дождитесь завершения загрузки модели в Chrome.',
  unavailable:
    'LanguageModel API есть, но модель недоступна для текущего профиля, устройства или настроек Chrome. Обновите Chrome и проверьте доступность встроенной AI-модели.',
  unsupported:
    'Текущий браузер не предоставляет LanguageModel API. Для локального анализа резюме откройте приложение в Chrome с поддержкой встроенной AI-модели.',
};
