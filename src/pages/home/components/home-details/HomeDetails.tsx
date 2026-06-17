import { HomeInfoItem } from './components/home-info-item';

import { HOME_CAPABILITIES, HOME_USE_CASES, HOME_WORKFLOW } from '../../common/constants';

import styles from './HomeDetails.module.scss';

export const HomeDetails = () => {
  return (
    <div className={styles.root}>
      <section className={styles.root__section}>
        <div className={styles.root__sectionHeader}>
          <h2 className={styles.root__sectionTitle}>Что можно сделать на сайте</h2>
          <p className={styles.root__sectionDescription}>
            Это не просто форма загрузки резюме. Внутри собраны основные шаги подготовки отклика: анализ, адаптация под
            вакансию, перевод, сравнение ролей и экспорт результата.
          </p>
        </div>
        <ul className={styles.root__infoGrid}>
          {HOME_CAPABILITIES.map((item) => (
            <HomeInfoItem key={item.title} item={item} />
          ))}
        </ul>
      </section>
      <section className={styles.root__section}>
        <div className={styles.root__sectionHeader}>
          <h2 className={styles.root__sectionTitle}>Как проходит работа</h2>
          <p className={styles.root__sectionDescription}>
            Сценарий рассчитан на быстрые итерации: загрузили резюме, уточнили цель, получили правки и сразу проверили
            следующую версию.
          </p>
        </div>
        <ul className={styles.root__workflow}>
          {HOME_WORKFLOW.map((item) => (
            <HomeInfoItem key={item.title} item={item} />
          ))}
        </ul>
      </section>
      <section className={styles.root__section}>
        <div className={styles.root__sectionHeader}>
          <h2 className={styles.root__sectionTitle}>Когда особенно полезно</h2>
          <p className={styles.root__sectionDescription}>
            Сервис помогает не переписывать резюме вслепую, а принимать решения по конкретной роли и требованиям
            вакансии.
          </p>
        </div>
        <ul className={styles.root__useCases}>
          {HOME_USE_CASES.map((item) => (
            <HomeInfoItem key={item.title} item={item} />
          ))}
        </ul>
      </section>
    </div>
  );
};
