import { useTranslation } from 'react-i18next';

import { HomeInfoItem } from './components/home-info-item';

import { HOME_CAPABILITIES, HOME_USE_CASES, HOME_WORKFLOW } from '../../common/constants';

import styles from './HomeDetails.module.scss';

export const HomeDetails = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <section className={styles.root__section}>
        <div className={styles.root__sectionHeader}>
          <h2 className={styles.root__sectionTitle}>{t('home.capabilitiesTitle')}</h2>
          <p className={styles.root__sectionDescription}>{t('home.capabilitiesText')}</p>
        </div>
        <ul className={styles.root__infoGrid}>
          {HOME_CAPABILITIES.map((item) => (
            <HomeInfoItem key={item.titleKey} item={item} />
          ))}
        </ul>
      </section>
      <section className={styles.root__section}>
        <div className={styles.root__sectionHeader}>
          <h2 className={styles.root__sectionTitle}>{t('home.processTitle')}</h2>
          <p className={styles.root__sectionDescription}>{t('home.processText')}</p>
        </div>
        <ul className={styles.root__workflow}>
          {HOME_WORKFLOW.map((item) => (
            <HomeInfoItem key={item.titleKey} item={item} />
          ))}
        </ul>
      </section>
      <section className={styles.root__section}>
        <div className={styles.root__sectionHeader}>
          <h2 className={styles.root__sectionTitle}>{t('home.useCasesTitle')}</h2>
          <p className={styles.root__sectionDescription}>{t('home.useCasesText')}</p>
        </div>
        <ul className={styles.root__useCases}>
          {HOME_USE_CASES.map((item) => (
            <HomeInfoItem key={item.titleKey} item={item} />
          ))}
        </ul>
      </section>
    </div>
  );
};
