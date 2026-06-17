import type { ChangeEvent } from 'react';

import { Textarea } from '@components/ui';

import type { VacancyFieldProps } from './types';

import styles from './VacancyField.module.scss';

export const VacancyField = ({ vacancyText, onVacancyTextChange }: VacancyFieldProps) => {
  const onVacancyTextInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onVacancyTextChange(event.target.value);
  };

  return (
    <>
      <label className={styles.root__label} htmlFor="vacancy-text">
        Текст вакансии
      </label>
      <Textarea
        className={styles.root__input}
        id="vacancy-text"
        minHeight={104}
        placeholder="Вставьте описание вакансии для сверки ключевых слов ATS"
        rows={4}
        value={vacancyText}
        onChange={onVacancyTextInputChange}
      />
    </>
  );
};
