import type { ChangeEvent } from 'react';

import { useTranslation } from 'react-i18next';

import { Textarea } from '@components/ui';

import type { VacancyFieldProps } from './types';

import styles from './VacancyField.module.scss';

export const VacancyField = ({ vacancyText, onVacancyTextChange }: VacancyFieldProps) => {
  const { t } = useTranslation();
  const onVacancyTextInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onVacancyTextChange(event.target.value);
  };

  return (
    <>
      <label className={styles.root__label} htmlFor="vacancy-text">
        {t('analysis.vacancy')}
      </label>
      <Textarea
        className={styles.root__input}
        id="vacancy-text"
        minHeight={104}
        placeholder={t('analysis.vacancyPlaceholder')}
        rows={4}
        value={vacancyText}
        onChange={onVacancyTextInputChange}
      />
    </>
  );
};
