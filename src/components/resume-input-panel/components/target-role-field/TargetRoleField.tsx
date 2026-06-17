import type { ChangeEvent } from 'react';

import { Textarea } from '@components/ui';

import type { TargetRoleFieldProps } from './types';

import styles from './TargetRoleField.module.scss';

export const TargetRoleField = ({ targetRole, onTargetRoleChange }: TargetRoleFieldProps) => {
  const onTargetRoleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onTargetRoleChange(event.target.value);
  };

  return (
    <>
      <label className={styles.root__label} htmlFor="target-role">
        Целевая роль или вакансия
      </label>
      <Textarea
        className={styles.root__input}
        id="target-role"
        minHeight={104}
        placeholder="Например: Senior Frontend Engineer, React/Vite, fintech"
        rows={4}
        value={targetRole}
        onChange={onTargetRoleInputChange}
      />
    </>
  );
};
