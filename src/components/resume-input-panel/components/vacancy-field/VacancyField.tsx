import styles from './VacancyField.module.scss';
import type { VacancyFieldProps } from './types';

export function VacancyField({ vacancyText, onVacancyTextChange }: VacancyFieldProps) {
  return (
    <>
      <label className={styles.vacancyField__label} htmlFor="vacancy-text">
        Текст вакансии
      </label>
      <textarea
        className={styles.vacancyField__input}
        id="vacancy-text"
        placeholder="Вставьте описание вакансии для сверки ключевых слов ATS"
        rows={4}
        value={vacancyText}
        onChange={(event) => onVacancyTextChange(event.target.value)}
      />
    </>
  );
}
