import { Textarea } from '@components/ui';

import type { VacancyFieldProps } from './types';

import styles from './VacancyField.module.scss';

export function VacancyField({ vacancyText, onVacancyTextChange }: VacancyFieldProps) {
  return (
    <>
      <label className={styles.vacancyField__label} htmlFor="vacancy-text">
        Текст вакансии
      </label>
      <Textarea
        className={styles.vacancyField__input}
        id="vacancy-text"
        minHeight={104}
        placeholder="Вставьте описание вакансии для сверки ключевых слов ATS"
        rows={4}
        value={vacancyText}
        onChange={(event) => onVacancyTextChange(event.target.value)}
      />
    </>
  );
}
