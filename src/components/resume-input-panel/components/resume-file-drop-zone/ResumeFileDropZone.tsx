import type { ChangeEvent } from 'react';

import styles from './ResumeFileDropZone.module.scss';
import type { ResumeFileDropZoneProps } from './types';

import { RESUME_FILE_ACCEPT } from '../../common/constants';

export function ResumeFileDropZone({ fileName, onFileChange }: ResumeFileDropZoneProps) {
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    onFileChange(file);
  }

  return (
    <label className={styles.resumeFileDropZone}>
      <input
        className={styles.resumeFileDropZone__input}
        accept={RESUME_FILE_ACCEPT}
        type="file"
        onChange={handleFileChange}
      />
      <span className={styles.resumeFileDropZone__icon} aria-hidden="true">
        +
      </span>
      <span>Выберите PDF, DOCX, TXT или MD</span>
      <strong className={styles.resumeFileDropZone__fileName}>{fileName || 'Файл не выбран'}</strong>
    </label>
  );
}
