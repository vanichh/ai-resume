import { Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { APP_ROUTES } from '@common/constants/routes';
import { useCopyToClipboardNotification } from '@common/hooks/useCopyToClipboardNotification';
import { Button } from '@components/ui';
import { useResumeStore } from '@store/resumeStore';

import { AdviceBlock } from './components/advice-block';
import { AdviceScoreCard } from './components/advice-score-card';
import { RewriteComparisonList } from './components/rewrite-comparison-list';
import { ScoreBreakdown } from './components/score-breakdown';
import { SectionScoreList } from './components/section-score-list';

import styles from './AdviceView.module.scss';

export const AdviceView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const advice = useResumeStore((state) => state.advice);
  const copyToClipboardWithNotification = useCopyToClipboardNotification();
  const missingKeywords = advice?.missingKeywords ?? [];

  const onMissingKeywordsCopyClick = () => {
    void copyToClipboardWithNotification(missingKeywords.join(', '), t('analysis.advice.missingKeywordsCopied'));
  };

  const onCorrectedResumeClick = () => {
    void navigate(APP_ROUTES.correctedResume);
  };

  return (
    <section className={styles.root}>
      <AdviceScoreCard advice={advice} />
      <Button
        className={styles.root__correctedResumeAction}
        disabled={!advice}
        fullWidth
        variant="primary"
        onClick={onCorrectedResumeClick}
      >
        {t('analysis.advice.correctedResumeAction')}
      </Button>
      <ScoreBreakdown />
      <SectionScoreList scores={advice?.sectionScores ?? []} />
      <AdviceBlock
        title={t('analysis.advice.summary.title')}
        values={advice ? [advice.summary] : []}
        empty={t('analysis.advice.summary.empty')}
        wide
      />
      <AdviceBlock
        title={t('analysis.advice.rewrittenSummary.title')}
        values={advice ? [advice.rewrittenSummary] : []}
        empty={t('analysis.advice.rewrittenSummary.empty')}
        wide
      />
      <RewriteComparisonList suggestions={advice?.rewriteSuggestions ?? []} />
      <AdviceBlock
        wide
        title={t('analysis.advice.strengths.title')}
        values={advice?.strengths ?? []}
        empty={t('analysis.advice.strengths.empty')}
      />
      <AdviceBlock
        wide
        title={t('analysis.advice.gaps.title')}
        values={advice?.gaps ?? []}
        empty={t('analysis.advice.gaps.empty')}
      />
      <AdviceBlock
        title={t('analysis.advice.missingKeywords.title')}
        values={missingKeywords}
        empty={t('analysis.advice.missingKeywords.empty')}
        headerAction={
          missingKeywords.length > 0 ? (
            <Button
              aria-label={t('analysis.advice.missingKeywords.copy')}
              size="small"
              onClick={onMissingKeywordsCopyClick}
            >
              <Copy aria-hidden size={16} />
            </Button>
          ) : null
        }
        wide
      />
      <AdviceBlock
        title={t('analysis.advice.bulletImprovements.title')}
        values={advice?.bulletImprovements ?? []}
        empty={t('analysis.advice.bulletImprovements.empty')}
        wide
      />
      <AdviceBlock
        title={t('analysis.advice.actions.title')}
        values={advice?.actions ?? []}
        empty={t('analysis.advice.actions.empty')}
        wide
      />
    </section>
  );
};
