import type { AppStatus } from '@common/types';

import styles from '../../ResumeInputPanel.module.scss';

const statusClassNames: Record<AppStatus, string> = {
  analyzing: styles.resumeInput__primaryButtonStatus_analyzing,
  done: styles.resumeInput__primaryButtonStatus_done,
  error: styles.resumeInput__primaryButtonStatus_error,
  idle: '',
  parsing: styles.resumeInput__primaryButtonStatus_parsing,
  ready: styles.resumeInput__primaryButtonStatus_ready,
  translating: styles.resumeInput__primaryButtonStatus_translating,
};

export function getSubmitButtonStatusClassName(status: AppStatus): string {
  return `${styles.resumeInput__primaryButtonStatus} ${statusClassNames[status]}`.trim();
}
