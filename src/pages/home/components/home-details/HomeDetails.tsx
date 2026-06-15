import { HomeInfoItem } from './components/home-info-item';

import { HOME_CAPABILITIES, HOME_USE_CASES, HOME_WORKFLOW } from '../../common/constants';

import styles from './HomeDetails.module.scss';

export const HomeDetails = () => {
  return (
    <div className={styles.homeDetails}>
      <section className={styles.homeDetails__section}>
        <div className={styles.homeDetails__sectionHeader}>
          <h2 className={styles.homeDetails__sectionTitle}>Что можно сделать на сайте</h2>
          <p className={styles.homeDetails__sectionDescription}>
            Это не просто форма загрузки резюме. Внутри собраны основные шаги подготовки отклика: анализ, адаптация под
            вакансию, перевод, сравнение ролей и экспорт результата.
          </p>
        </div>
        <ul className={styles.homeDetails__infoGrid}>
          {HOME_CAPABILITIES.map((item) => (
            <HomeInfoItem key={item.title} item={item} />
          ))}
        </ul>
      </section>
      <section className={styles.homeDetails__section}>
        <div className={styles.homeDetails__sectionHeader}>
          <h2 className={styles.homeDetails__sectionTitle}>Как проходит работа</h2>
          <p className={styles.homeDetails__sectionDescription}>
            Сценарий рассчитан на быстрые итерации: загрузили резюме, уточнили цель, получили правки и сразу проверили
            следующую версию.
          </p>
        </div>
        <ul className={styles.homeDetails__workflow}>
          {HOME_WORKFLOW.map((item) => (
            <HomeInfoItem key={item.title} item={item} />
          ))}
        </ul>
      </section>
      <section className={styles.homeDetails__section}>
        <div className={styles.homeDetails__sectionHeader}>
          <h2 className={styles.homeDetails__sectionTitle}>Когда особенно полезно</h2>
          <p className={styles.homeDetails__sectionDescription}>
            Сервис помогает не переписывать резюме вслепую, а принимать решения по конкретной роли и требованиям
            вакансии.
          </p>
        </div>
        <ul className={styles.homeDetails__useCases}>
          {HOME_USE_CASES.map((item) => (
            <HomeInfoItem key={item.title} item={item} />
          ))}
        </ul>
      </section>
    </div>
  );
};
