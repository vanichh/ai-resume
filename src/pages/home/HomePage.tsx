import { HomeDetails } from './components/home-details';
import { HomeHero } from './components/home-hero';
import { HomePreview } from './components/home-preview';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <section className={styles.root}>
      <HomeHero />
      <HomePreview />
      <HomeDetails />
    </section>
  );
};
