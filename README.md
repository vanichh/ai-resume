# AI Resume Review

Pet project для анализа резюме прямо в браузере. Приложение парсит файл резюме, учитывает целевую роль или вакансию и формирует практичные рекомендации через браузерный `LanguageModel` API.

Проект разработан с использованием Codex.

## Stack

- React 19
- TypeScript
- Vite
- Zustand
- SCSS Modules
- ESLint
- Husky
- GitHub Actions

## Features

- Загрузка резюме в форматах `PDF`, `DOCX`, `TXT`, `MD`.
- Извлечение текста на клиенте без отправки файла на сервер.
- Анализ под целевую роль и текст вакансии.
- ATS score, краткая оценка, сильные стороны и зоны роста.
- Поиск недостающих ключевых слов.
- Переписывание summary и bullet points.
- Перевод резюме с выбором языка и тона.
- История переводов.
- Экспорт рекомендаций в Markdown и JSON.

## Browser Support

Приложение использует экспериментальный `LanguageModel` API, поэтому поддержка зависит от браузера и окружения.

Для Prompt API в Chrome могут потребоваться:

- поддерживаемая версия Chrome;
- подходящее устройство;
- включенная поддержка API;
- первичная загрузка модели в браузере.

Если API недоступен, приложение покажет подсказку с доступными действиями.

## Project Notes

- Большие резюме не обрезаются слепо с начала файла: приложение пытается выделить и приоритизировать секции опыта, проектов, навыков и summary.
- Данные обрабатываются на клиенте.
- Основной сценарий деплоя рассчитан на GitHub Pages.

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run format
npm run format:check
npm run lint
npm run typecheck
npm run build
npm run preview
```

## Code Quality

В проекте настроены ESLint, Prettier и Husky.

Prettier отвечает за форматирование и сортировку импортов.

- `pre-commit`: запускает `npm run lint` и `npm run format:check`.
- `pre-push`: запускает `npm run build`.

Husky устанавливается автоматически через `prepare` script после `npm install`.
