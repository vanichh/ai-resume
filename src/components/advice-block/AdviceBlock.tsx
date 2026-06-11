import type { AdviceBlockProps } from './types';

import styles from './AdviceBlock.module.scss';

export function AdviceBlock({ title, values, empty, wide = false }: AdviceBlockProps) {
  const blockClassName = `${styles.adviceBlock} ${wide ? styles.adviceBlock_wide : ''}`;

  return (
    <article className={blockClassName}>
      <h2 className={styles.adviceBlock__title}>{title}</h2>
      {values.length > 0 ? (
        <ul className={styles.adviceBlock__list}>
          {values.map((value) => (
            <li className={styles.adviceBlock__item} key={value}>
              {value}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.adviceBlock__empty}>{empty}</p>
      )}
    </article>
  );
}
