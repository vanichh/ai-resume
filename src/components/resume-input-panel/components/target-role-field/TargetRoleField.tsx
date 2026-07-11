import type { ChangeEvent } from 'react';

import { useTranslation } from 'react-i18next';

import { Textarea } from '@components/ui';

import type { TargetRoleFieldProps } from './types';

import styles from './TargetRoleField.module.scss';

export const TargetRoleField = ({ targetRole, onTargetRoleChange }: TargetRoleFieldProps) => {
  const { t } = useTranslation();
  const onTargetRoleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onTargetRoleChange(event.target.value);
  };

  return (
    <>
      <label className={styles.root__label} htmlFor="target-role">
        {t('analysis.target')}
      </label>
      <Textarea
        className={styles.root__input}
        id="target-role"
        minHeight={104}
        placeholder={t('analysis.targetPlaceholder')}
        rows={4}
        value={targetRole}
        onChange={onTargetRoleInputChange}
      />
    </>
  );
};
