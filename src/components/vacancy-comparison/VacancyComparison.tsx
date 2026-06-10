import { Button } from '@components/ui';

import { useResumeStore } from '@store/resumeStore';
import { selectCanCompareVacancies } from '@store/selectors';

import { VacancyComparisonItem } from './components/vacancy-comparison-item';

import styles from './VacancyComparison.module.scss';

export function VacancyComparison() {
  const addComparisonVacancy = useResumeStore((state) => state.addComparisonVacancy);
  const analyzeComparison = useResumeStore((state) => state.analyzeComparison);
  const canCompare = useResumeStore(selectCanCompareVacancies);
  const comparisonVacancies = useResumeStore((state) => state.comparisonVacancies);
  const removeComparisonVacancy = useResumeStore((state) => state.removeComparisonVacancy);
  const selectComparisonVacancy = useResumeStore((state) => state.selectComparisonVacancy);
  const setComparisonVacancyText = useResumeStore((state) => state.setComparisonVacancyText);
  const setComparisonVacancyTitle = useResumeStore((state) => state.setComparisonVacancyTitle);

  return (
    <section className={styles.vacancyComparison}>
      <div className={styles.vacancyComparison__header}>
        <div>
          <h2 className={styles.vacancyComparison__title}>Сравнение вакансий</h2>
          <p className={styles.vacancyComparison__subtitle}>До 4 вакансий для одного резюме.</p>
        </div>
        <Button disabled={comparisonVacancies.length >= 4} size="medium" onClick={addComparisonVacancy}>
          Добавить
        </Button>
      </div>
      {comparisonVacancies.length > 0 && (
        <div className={styles.vacancyComparison__list}>
          {comparisonVacancies.map((item) => (
            <VacancyComparisonItem
              item={item}
              key={item.id}
              onRemove={removeComparisonVacancy}
              onSelect={selectComparisonVacancy}
              onTextChange={setComparisonVacancyText}
              onTitleChange={setComparisonVacancyTitle}
            />
          ))}
        </div>
      )}
      <Button disabled={!canCompare} fullWidth size="large" variant="primary" onClick={() => void analyzeComparison()}>
        Сравнить с вакансиями
      </Button>
    </section>
  );
}
