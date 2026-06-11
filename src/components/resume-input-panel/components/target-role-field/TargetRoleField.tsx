import { Textarea } from '@components/ui';

import type { TargetRoleFieldProps } from './types';

import styles from './TargetRoleField.module.scss';

export function TargetRoleField({ targetRole, onTargetRoleChange }: TargetRoleFieldProps) {
  return (
    <>
      <label className={styles.targetRoleField__label} htmlFor="target-role">
        Целевая роль или вакансия
      </label>
      <Textarea
        className={styles.targetRoleField__input}
        id="target-role"
        minHeight={104}
        placeholder="Например: Senior Frontend Engineer, React/Vite, fintech"
        rows={4}
        value={targetRole}
        onChange={(event) => onTargetRoleChange(event.target.value)}
      />
    </>
  );
}
