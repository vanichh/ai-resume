import { Button } from '@components/ui';

import type { VacancyComparisonItemProps } from './types';

import styles from '../../VacancyComparison.module.scss';
import { VACANCY_COMPARISON_STATUS_LABELS } from '../../common/constants';

export function VacancyComparisonItem({
  item,
  onRemove,
  onSelect,
  onTextChange,
  onTitleChange,
}: VacancyComparisonItemProps) {
  const canSelectResult = Boolean(item.advice);

  return (
    <article className={styles.vacancyComparison__item}>
      <div className={styles.vacancyComparison__itemHeader}>
        <input
          className={styles.vacancyComparison__titleInput}
          placeholder="Название вакансии"
          type="text"
          value={item.title}
          onChange={(event) => onTitleChange(item.id, event.target.value)}
        />
        <Button size="medium" onClick={() => onRemove(item.id)}>
          Удалить
        </Button>
      </div>
      <textarea
        className={styles.vacancyComparison__textarea}
        placeholder="Вставьте текст вакансии"
        value={item.vacancyText}
        onChange={(event) => onTextChange(item.id, event.target.value)}
      />
      <div className={styles.vacancyComparison__result}>
        <span className={styles.vacancyComparison__status}>{VACANCY_COMPARISON_STATUS_LABELS[item.status]}</span>
        {item.advice && (
          <>
            <strong className={styles.vacancyComparison__score}>{item.advice.score}/100</strong>
            <p className={styles.vacancyComparison__summary}>{item.advice.summary}</p>
            {item.advice.missingKeywords.length > 0 && (
              <p className={styles.vacancyComparison__keywords}>
                Нет ключевых слов: {item.advice.missingKeywords.slice(0, 6).join(', ')}
              </p>
            )}
            <Button
              className={styles.vacancyComparison__selectButton}
              disabled={!canSelectResult}
              size="medium"
              onClick={() => onSelect(item.id)}
            >
              Открыть результат
            </Button>
          </>
        )}
        {item.error && <p className={styles.vacancyComparison__error}>{item.error}</p>}
      </div>
    </article>
  );
}
