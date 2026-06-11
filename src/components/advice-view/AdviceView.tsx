import { AdviceBlock } from '@components/advice-block';
import { ScoreBreakdown } from '@components/score-breakdown';

import { useResumeStore } from '@store/resumeStore';

import { AdviceScoreCard } from './components/advice-score-card';
import { RewriteComparisonList } from './components/rewrite-comparison-list';
import { SectionScoreList } from './components/section-score-list';

import styles from './AdviceView.module.scss';

export function AdviceView() {
  const advice = useResumeStore((state) => state.advice);

  return (
    <section className={styles.adviceView}>
      <AdviceScoreCard advice={advice} />
      <ScoreBreakdown />
      <SectionScoreList scores={advice?.sectionScores ?? []} />
      <AdviceBlock
        title="Кратко"
        values={advice ? [advice.summary] : []}
        empty="Здесь появится итоговая оценка."
        wide
      />
      <AdviceBlock
        title="Новый профиль"
        values={advice ? [advice.rewrittenSummary] : []}
        empty="Модель предложит более сильный профиль."
        wide
      />
      <RewriteComparisonList suggestions={advice?.rewriteSuggestions ?? []} />
      <AdviceBlock title="Сильные стороны" values={advice?.strengths ?? []} empty="Пока нет данных." />
      <AdviceBlock title="Пробелы" values={advice?.gaps ?? []} empty="Пока нет данных." />
      <AdviceBlock
        title="Недостающие ключевые слова"
        values={advice?.missingKeywords ?? []}
        empty="Пока нет данных."
        wide
      />
      <AdviceBlock
        title="Правки пунктов опыта"
        values={advice?.bulletImprovements ?? []}
        empty="Пока нет данных."
        wide
      />
      <AdviceBlock title="Что улучшить" values={advice?.actions ?? []} empty="Пока нет данных." wide />
    </section>
  );
}
