import { Suspense } from 'react';

import { Languages } from 'lucide-react';
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
  const { translation } = useResumeStore(useShallow(selectTranslationPageState));

  return (
    <section className={styles.root}>
      <TranslationControlPanel />
      <div className={styles.root__content}>
        <Suspense
          fallback={
            <div className={styles.root__loader}>
              <Loader label="Загрузка страницы перевода" />
            </div>
          }
        >
          {translation ? (
            <ResumeTranslationPreview />
          ) : (
            <EmptyState
              description="Загрузите резюме, выберите язык и запустите перевод."
              icon={<Languages aria-hidden size={18} />}
              title="Перевод появится здесь"
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
