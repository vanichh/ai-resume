import { useTranslation } from 'react-i18next';

import { TELEGRAM_HANDLE, TELEGRAM_URL } from './common/constants';

import { TelegramIcon } from './components/telegram-icon';

import styles from './AppFooter.module.scss';

export const AppFooter = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.root}>
      <div className={styles.root__inner}>
        <p className={styles.root__copyright}>{t('footer.copyright', { year: currentYear })}</p>
        <a className={styles.root__telegramLink} href={TELEGRAM_URL} rel="noreferrer" target="_blank">
          <TelegramIcon className={styles.root__telegramIcon} />
          <span className={styles.root__telegramHandle}>{TELEGRAM_HANDLE}</span>
        </a>
      </div>
    </footer>
  );
};
