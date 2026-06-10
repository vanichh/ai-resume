import styles from './TargetRoleField.module.scss';
import type { TargetRoleFieldProps } from './types';

export function TargetRoleField({ targetRole, onTargetRoleChange }: TargetRoleFieldProps) {
  return (
    <>
      <label className={styles.targetRoleField__label} htmlFor="target-role">
        Целевая роль или вакансия
      </label>
      <textarea
        className={styles.targetRoleField__input}
        id="target-role"
        placeholder="Например: Senior Frontend Engineer, React/Vite, fintech"
        rows={4}
        value={targetRole}
        onChange={(event) => onTargetRoleChange(event.target.value)}
      />
    </>
  );
}
