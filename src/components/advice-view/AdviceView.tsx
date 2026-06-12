import { Copy } from 'lucide-react';

import { useCopyToClipboardNotification } from '@common/hooks/useCopyToClipboardNotification';

import { AdviceBlock } from '@components/advice-block';
import { ScoreBreakdown } from '@components/score-breakdown';
import { Button } from '@components/ui';

import { useResumeStore } from '@store/resumeStore';

import { AdviceScoreCard } from './components/advice-score-card';
import { RewriteComparisonList } from './components/rewrite-comparison-list';
import { SectionScoreList } from './components/section-score-list';

import styles from './AdviceView.module.scss';

export function AdviceView() {
  const advice = useResumeStore((state) => state.advice);
  const copyToClipboardWithNotification = useCopyToClipboardNotification();
  const missingKeywords = advice?.missingKeywords ?? [];

  return (
    <section className={styles.adviceView}>
      <AdviceScoreCard advice={advice} />
      <ScoreBreakdown />
      <SectionScoreList scores={advice?.sectionScores ?? []} />
      <AdviceBlock
        title="Кратко"
        values={advice ? [advice.summary] : []}
        empty="Запустите анализ, чтобы получить короткое резюме по качеству профиля."
        wide
      />
      <AdviceBlock
        title="Новый профиль"
        values={advice ? [advice.rewrittenSummary] : []}
        empty="После анализа здесь появится более сильная версия блока summary."
        wide
      />
      <RewriteComparisonList suggestions={advice?.rewriteSuggestions ?? []} />
      <AdviceBlock
        wide
        title="Сильные стороны"
        values={advice?.strengths ?? []}
        empty="Анализ выделит сильные сигналы, которые уже работают в резюме."
      />
      <AdviceBlock
        wide
        title="Пробелы"
        values={advice?.gaps ?? []}
        empty="Здесь появятся слабые места: недоказанные навыки, разрывы и неясные формулировки."
      />
      <AdviceBlock
        title="Недостающие ключевые слова"
        values={missingKeywords}
        empty="Добавьте описание вакансии и запустите анализ, чтобы увидеть недостающие ATS-термины."
        headerAction={
          missingKeywords.length > 0 ? (
            <Button
              aria-label="Скопировать недостающие ключевые слова"
              size="small"
              onClick={() =>
                void copyToClipboardWithNotification(missingKeywords.join(', '), 'Ключевые слова скопированы.')
              }
            >
              <Copy aria-hidden size={16} />
            </Button>
          ) : null
        }
        wide
      />
      <AdviceBlock
        title="Правки пунктов опыта"
        values={advice?.bulletImprovements ?? []}
        empty="После анализа здесь появятся точечные правки bullet points."
        wide
      />
      <AdviceBlock
        title="Что улучшить"
        values={advice?.actions ?? []}
        empty="Здесь будет список следующих действий по усилению резюме."
        wide
      />
    </section>
  );
}
