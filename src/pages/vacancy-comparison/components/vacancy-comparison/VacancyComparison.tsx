import { useShallow } from 'zustand/react/shallow';

import { Button, CollapsibleBlock } from '@components/ui';
import { useResumeStore } from '@store/resumeStore';

import { selectVacancyComparisonState } from './common/selectors';

import { VacancyComparisonItem } from './components/vacancy-comparison-item';

import styles from './VacancyComparison.module.scss';

export const VacancyComparison = () => {
  const {
    addComparisonVacancy,
    analyzeComparison,
    canCompare,
    comparisonVacancies,
    removeComparisonVacancy,
    selectComparisonVacancy,
    setComparisonVacancyText,
    setComparisonVacancyTitle,
  } = useResumeStore(useShallow(selectVacancyComparisonState));

  const onAnalyzeComparisonClick = () => {
    void analyzeComparison();
  };

  return (
    <CollapsibleBlock
      className={styles.root}
      headerAction={
        <Button disabled={comparisonVacancies.length >= 4} size="medium" onClick={addComparisonVacancy}>
          Добавить
        </Button>
      }
      title="Сравнение вакансий"
    >
      <p className={styles.root__subtitle}>До 4 вакансий для одного резюме.</p>
      {comparisonVacancies.length > 0 && (
        <div className={styles.root__list}>
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
      <Button disabled={!canCompare} fullWidth size="large" variant="primary" onClick={onAnalyzeComparisonClick}>
        Сравнить с вакансиями
      </Button>
    </CollapsibleBlock>
  );
};
