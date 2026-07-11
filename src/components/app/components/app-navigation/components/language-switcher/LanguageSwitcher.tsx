import type { ChangeEvent } from 'react';

import type { SupportedLanguageType } from '@i18n/index';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const onLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    void i18n.changeLanguage(event.target.value as SupportedLanguageType);
  };

  return (
    <label className={styles.root}>
      <Languages aria-hidden size={18} />
      <span className={styles.root__label}>{t('language.switch')}</span>
      <select className={styles.root__select} value={i18n.resolvedLanguage} onChange={onLanguageChange}>
        <option value="ru">{t('language.ru')}</option>
        <option value="en">{t('language.en')}</option>
      </select>
    </label>
  );
};
