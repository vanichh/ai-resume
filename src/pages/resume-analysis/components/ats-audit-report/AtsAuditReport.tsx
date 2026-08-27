import { CircleAlert, CircleCheck, CircleMinus, CircleX, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { useAtsAudit } from '@common/hooks/useAtsAudit';
import type { AtsAuditCheckStatusType } from '@common/types';

import styles from './AtsAuditReport.module.scss';

const STATUS_ICONS: Record<AtsAuditCheckStatusType, LucideIcon> = {
  failed: CircleX,
  passed: CircleCheck,
  skipped: CircleMinus,
  warning: CircleAlert,
};

export const AtsAuditReport = () => {
  const audit = useAtsAudit();

  if (audit.checks.length === 0) {
    return null;
  }

  return (
    <section className={styles.root}>
      <div className={styles.root__header}>
        <span className={styles.root__titleIcon}>
          <ShieldCheck aria-hidden size={20} />
        </span>
        <div className={styles.root__heading}>
          <h2 className={styles.root__title}>Детерминированный ATS-аудит</h2>
          <p className={styles.root__subtitle}>Проверка структуры и читаемости без участия AI-модели.</p>
        </div>
        <strong className={styles.root__score}>{audit.score}/100</strong>
      </div>
      <div className={styles.root__track} aria-hidden="true">
        <span className={styles.root__bar} style={{ width: `${audit.score}%` }} />
      </div>
      <p className={styles.root__summary}>
        Пройдено: {audit.passedCount} · предупреждений: {audit.warningCount} · ошибок: {audit.failedCount}
      </p>
      <ul className={styles.root__checks}>
        {audit.checks.map((check) => {
          const StatusIcon = STATUS_ICONS[check.status];

          return (
            <li className={styles.root__check} data-status={check.status} key={check.id}>
              <StatusIcon aria-hidden className={styles.root__checkIcon} size={18} />
              <div className={styles.root__checkContent}>
                <div className={styles.root__checkHeader}>
                  <strong>{check.label}</strong>
                  <span>
                    {check.status === 'skipped' ? 'Не учитывается' : `${check.earnedPoints}/${check.maxPoints}`}
                  </span>
                </div>
                <p>{check.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
