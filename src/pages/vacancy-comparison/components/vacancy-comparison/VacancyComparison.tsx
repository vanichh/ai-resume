import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

import { APP_ROUTES } from '@common/constants/routes';
import { Button, CollapsibleBlock } from '@components/ui';
import { useResumeStore } from '@store/resumeStore';

import { selectVacancyComparisonState } from './common/selectors';

import { VacancyComparisonItem } from './components/vacancy-comparison-item';

import styles from './VacancyComparison.module.scss';

export const VacancyComparison = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    addComparisonVacancy,
    analyzeComparison,
    canCompare,
    comparisonVacancies,
    isComparing,
    removeComparisonVacancy,
    selectComparisonVacancy,
    setComparisonVacancyText,
    setComparisonVacancyTitle,
  } = useResumeStore(useShallow(selectVacancyComparisonState));

  const onAnalyzeComparisonClick = () => {
    void analyzeComparison();
  };

  const onComparisonVacancySelect = (id: string) => {
    selectComparisonVacancy(id);
    void navigate(APP_ROUTES.resumeAnalysis);
  };

  return (
    <CollapsibleBlock
      className={styles.root}
      headerAction={
        <Button disabled={comparisonVacancies.length >= 4} size="medium" onClick={addComparisonVacancy}>
          {t('common.add')}
        </Button>
      }
      title={t('workspace.comparison.title')}
    >
      <p className={styles.root__subtitle}>{t('workspace.comparison.subtitle')}</p>
      {comparisonVacancies.length > 0 && (
        <div className={styles.root__list}>
          {comparisonVacancies.map((item) => (
            <VacancyComparisonItem
              item={item}
              key={item.id}
              onRemove={removeComparisonVacancy}
              onSelect={onComparisonVacancySelect}
              onTextChange={setComparisonVacancyText}
              onTitleChange={setComparisonVacancyTitle}
            />
          ))}
        </div>
      )}
      <Button
        disabled={!canCompare}
        fullWidth
        loading={isComparing}
        size="large"
        variant="primary"
        onClick={onAnalyzeComparisonClick}
      >
        {isComparing ? t('workspace.comparison.comparing') : t('workspace.comparison.compare')}
      </Button>
    </CollapsibleBlock>
  );
};
