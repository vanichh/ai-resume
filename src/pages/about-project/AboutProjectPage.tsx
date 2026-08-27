import { SecondaryPageLayout } from '@components/layouts/secondary-page-layout';

import styles from './AboutProjectPage.module.scss';

const workLinks = [
  {
    label: 'Telegram',
    href: 'https://t.me/vanichh',
    text: '@vanichh',
  },
  {
    label: 'HeadHunter',
    href: 'https://hh.ru/resume/f8413244ff08cfd4a30039ed1f6c334a633134',
    text: 'Резюме',
  },
];

const features = [
  {
    title: 'Анализ резюме',
    description: 'Проверяем структуру, контактные данные, длину текста, разделы и ключевые слова под вакансию.',
  },
  {
    title: 'Сравнение с вакансией',
    description: 'Подсвечиваем совпадения по навыкам и показываем, где нужно улучшить описание опыта.',
  },
  {
    title: 'Генерация сопроводительного',
    description: 'Помогаем быстро собрать сопроводительное письмо на основе вашей цели и вакансии.',
  },
  {
    title: 'Локальная работа',
    description: 'Сервис сохраняет данные в браузере и помогает держать процесс приватным и прозрачным.',
  },
];

export const AboutProjectPage = () => {
  return (
    <SecondaryPageLayout className={styles.root}>
      <section className={styles.root__content}>
        <p className={styles.root__eyebrow}>AI Resume Review</p>
        <h1 className={styles.root__title}>О проекте</h1>
        <p className={styles.root__lead}>
          AI Resume Review — это инструмент для кандидатов, которые хотят быстро понять, насколько резюме готово к
          вакансии и что лучше улучшить перед отправкой.
        </p>

        <p className={styles.root__lead}>
          Я — опытный разработчик, и меня можно нанять для работы над продуктами, интерфейсами, внутренними
          инструментами и системами, где важны ясная архитектура, качество кода и внимательное отношение к задачам.
        </p>

        <div className={styles.root__contacts}>
          <h2 className={styles.root__contactsTitle}>Контакты</h2>
          <ul className={styles.root__contactList}>
            {workLinks.map(({ href, label, text }) => (
              <li className={styles.root__contactItem} key={label}>
                <span className={styles.root__contactLabel}>{label}:</span>{' '}
                <a className={styles.root__link} href={href} rel="noreferrer" target="_blank">
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.root__grid}>
          {features.map(({ description, title }) => (
            <article className={styles.root__card} key={title}>
              <h2 className={styles.root__cardTitle}>{title}</h2>
              <p className={styles.root__cardText}>{description}</p>
            </article>
          ))}
        </div>

        <p className={styles.root__note}>
          Проект создан, чтобы сделать процесс поиска работы понятнее: меньше ручной проверки, больше ясности по сильным
          и слабым местам резюме. Если вам нужен опытный разработчик для реализации интерфейсов, продуктов и инженерных
          решений — буду рад рассмотреть предложение.
        </p>
      </section>
    </SecondaryPageLayout>
  );
};
