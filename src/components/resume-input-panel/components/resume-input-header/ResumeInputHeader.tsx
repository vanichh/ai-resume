import styles from './ResumeInputHeader.module.scss';

export const ResumeInputHeader = () => {
  return (
    <header className={styles.root}>
      <div>
        <h1 className={styles.root__title}>Разбор резюме в браузере</h1>
        <p className={styles.root__subtitle}>
          Загрузите резюме и опишите целевую роль, чтобы получить прикладные правки.
        </p>
      </div>
    </header>
  );
};
