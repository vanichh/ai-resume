import { PrivacyCenter } from '@components/privacy-center';

import styles from './PrivacyPage.module.scss';

export const PrivacyPage = () => {
  return (
    <section className={styles.privacyPage}>
      <PrivacyCenter />
    </section>
  );
};
