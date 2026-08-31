import { Suspense } from 'react';

import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

import { EmptyState, Loader } from '@components/ui';
import { useResumeStore } from '@store/resumeStore';

import {
  ResumeComparisonView,
  ResumePreview,
  ResumeTranslationPreview,
  TranslationHistory,
} from './common/lazyComponents';
import { selectTranslationPageState } from './common/selectors';

import { TranslationControlPanel } from './components/translation-control-panel';

import styles from './TranslationPage.module.scss';

export const TranslationPage = () => {
  const { t } = useTranslation();
  const { translation } = useResumeStore(useShallow(selectTranslationPageState));

  return (
    <section className={styles.root}>
      <TranslationControlPanel />
      <div className={styles.root__content}>
        <Suspense
          fallback={
            <div className={styles.root__loader}>
              <Loader label={t('workspace.translation.pageLoading')} />
            </div>
          }
        >
          {translation ? (
            <ResumeTranslationPreview />
          ) : (
            <EmptyState
              description={t('workspace.translation.emptyDescription')}
              icon={<Languages aria-hidden size={18} />}
              title={t('workspace.translation.emptyTitle')}
            />
          )}
          <TranslationHistory />
          <ResumeComparisonView />
          <ResumePreview defaultTextExpanded />
        </Suspense>
      </div>
    </section>
  );
};
