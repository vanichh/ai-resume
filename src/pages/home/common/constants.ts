import type { HomeFeatureType, HomeInfoItemType, HomePreviewStepType } from '../types';

export const HOME_FEATURES = [
  {
    icon: 'lock',
    title: 'Работает локально',
    description: 'Текст резюме остается в браузере, без отправки на внешний сервер.',
  },
  {
    icon: 'target',
    title: 'Оценивает под роль',
    description: 'Сверяет резюме с целевой позицией, ATS-словами и требованиями вакансии.',
  },
  {
    icon: 'send',
    title: 'Помогает с откликом',
    description: 'Готовит рекомендации, перевод, сравнение вакансий и сопроводительное письмо.',
  },
] as const satisfies readonly HomeFeatureType[];

export const HOME_PREVIEW_STEPS = [
  {
    progress: 'high',
    score: '82/100',
    title: 'Профиль',
  },
  {
    progress: 'medium',
    score: '74/100',
    title: 'Ключевые слова',
  },
  {
    progress: 'low',
    score: '68/100',
    title: 'Метрики',
  },
] as const satisfies readonly HomePreviewStepType[];

export const HOME_CAPABILITIES = [
  {
    icon: 'scanSearch',
    title: 'Разбор резюме',
    description:
      'Сервис показывает общий score, оценивает профиль, опыт, образование, навыки, ключевые слова и метрики.',
  },
  {
    icon: 'sparkles',
    title: 'Рекомендации по тексту',
    description:
      'Вы получаете слабые места, сильные стороны, missing keywords и варианты, как переписать фрагменты резюме.',
  },
  {
    icon: 'target',
    title: 'ATS и вакансия',
    description:
      'Можно вставить текст вакансии, сверить совпадения по ключевым словам и понять, чего не хватает для конкретной роли.',
  },
  {
    icon: 'languages',
    title: 'Перевод резюме',
    description:
      'Отдельный раздел помогает перевести резюме в выбранном тоне: формально, кратко, ATS-friendly или для рекрутера.',
  },
  {
    icon: 'gitCompare',
    title: 'Сравнение вакансий',
    description: 'Добавьте несколько вакансий и сравните, под какую из них текущее резюме выглядит сильнее.',
  },
  {
    icon: 'mail',
    title: 'Сопроводительное письмо',
    description:
      'На основе резюме и вакансии можно подготовить черновик письма, который проще доработать под конкретный отклик.',
  },
] as const satisfies readonly HomeInfoItemType[];

export const HOME_WORKFLOW = [
  {
    icon: 'upload',
    title: '1. Загрузите файл',
    description: 'Поддерживаются PDF, DOCX, TXT и MD. Текст извлекается прямо в браузере.',
  },
  {
    icon: 'target',
    title: '2. Укажите цель',
    description: 'Добавьте роль или вакансию, чтобы рекомендации были не общими, а прикладными.',
  },
  {
    icon: 'fileText',
    title: '3. Заберите правки',
    description: 'Используйте score, рекомендации, экспорт и историю анализов для следующей итерации резюме.',
  },
  {
    icon: 'sparkles',
    title: '4. Улучшайте резюме',
    description: 'Вносите правки, усиливайте ключевые блоки и повышайте шансы на отклик.',
  },
] as const satisfies readonly HomeInfoItemType[];

export const HOME_USE_CASES = [
  {
    icon: 'send',
    title: 'Перед отправкой отклика',
    description: 'Быстро проверить, насколько резюме совпадает с описанием вакансии.',
  },
  {
    icon: 'languages',
    title: 'Перед переводом резюме',
    description: 'Подготовить англоязычную версию без потери структуры и ключевых формулировок.',
  },
  {
    icon: 'briefcase',
    title: 'Перед сменой роли',
    description: 'Понять, какие навыки и достижения стоит поднять выше для новой позиции.',
  },
] as const satisfies readonly HomeInfoItemType[];
