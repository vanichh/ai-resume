import styles from './ResumeInputHeader.module.scss';

export const ResumeInputHeader = () => {
  return (
    <header className={styles.resumeInputHeader}>
      <div>
        <h1 className={styles.resumeInputHeader__title}>Разбор резюме в браузере</h1>
        <p className={styles.resumeInputHeader__subtitle}>
          Загрузите резюме и опишите целевую роль, чтобы получить прикладные правки.
        </p>
      </div>
    </header>
  );
};
