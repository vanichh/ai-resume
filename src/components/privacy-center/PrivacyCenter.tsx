import { getResumeWorkspaceStorageSize } from '@common/utils/resumeWorkspaceStorage';

import { Button } from '@components/ui';

import { useResumeStore } from '@store/resumeStore';

import styles from './PrivacyCenter.module.scss';

function formatStorageSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  return `${(bytes / 1024).toFixed(1)} KB`;
}

export function PrivacyCenter() {
  const analysisHistoryCount = useResumeStore((state) => state.analysisHistory.length);
  const clearWorkspace = useResumeStore((state) => state.clearWorkspace);
  const comparisonVacanciesCount = useResumeStore((state) => state.comparisonVacancies.length);
  const coverLetter = useResumeStore((state) => state.coverLetter);
  const resumeText = useResumeStore((state) => state.resumeText);
  const translationHistoryCount = useResumeStore((state) => state.translationHistory.length);
  const storageSize = formatStorageSize(getResumeWorkspaceStorageSize());

  return (
    <section className={styles.privacyCenter}>
      <div className={styles.privacyCenter__header}>
        <div>
          <h2 className={styles.privacyCenter__title}>Приватность</h2>
          <p className={styles.privacyCenter__subtitle}>Данные сохраняются только в локальном хранилище браузера.</p>
        </div>
        <Button size="small" onClick={clearWorkspace}>
          Очистить все
        </Button>
      </div>
      <dl className={styles.privacyCenter__list}>
        <div className={styles.privacyCenter__item}>
          <dt>Текст резюме</dt>
          <dd>{resumeText ? 'сохранен' : 'не сохранен'}</dd>
        </div>
        <div className={styles.privacyCenter__item}>
          <dt>История анализов</dt>
          <dd>{analysisHistoryCount}</dd>
        </div>
        <div className={styles.privacyCenter__item}>
          <dt>Переводы</dt>
          <dd>{translationHistoryCount}</dd>
        </div>
        <div className={styles.privacyCenter__item}>
          <dt>Сравнения вакансий</dt>
          <dd>{comparisonVacanciesCount}</dd>
        </div>
        <div className={styles.privacyCenter__item}>
          <dt>Сопроводительное письмо</dt>
          <dd>{coverLetter ? 'сохранено' : 'не сохранено'}</dd>
        </div>
        <div className={styles.privacyCenter__item}>
          <dt>Размер данных</dt>
          <dd>{storageSize}</dd>
        </div>
      </dl>
    </section>
  );
}
