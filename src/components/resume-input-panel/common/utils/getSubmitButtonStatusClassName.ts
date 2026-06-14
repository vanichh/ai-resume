import clsx from 'clsx';

import type { AppStatusType } from '@common/types';

import styles from '../../ResumeInputPanel.module.scss';

const statusClassNames: Record<AppStatusType, string> = {
  analyzing: styles.resumeInput__primaryButtonStatus_analyzing,
  done: styles.resumeInput__primaryButtonStatus_done,
  error: styles.resumeInput__primaryButtonStatus_error,
  idle: '',
  parsing: styles.resumeInput__primaryButtonStatus_parsing,
  ready: styles.resumeInput__primaryButtonStatus_ready,
  translating: styles.resumeInput__primaryButtonStatus_translating,
};

export const getSubmitButtonStatusClassName = (status: AppStatusType): string => {
  return clsx(styles.resumeInput__primaryButtonStatus, statusClassNames[status]);
};
