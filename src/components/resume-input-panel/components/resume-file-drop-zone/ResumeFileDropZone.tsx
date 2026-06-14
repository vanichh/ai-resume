import type { ChangeEvent } from 'react';

import { Upload } from 'lucide-react';

import type { ResumeFileDropZoneProps } from './types';

import { RESUME_FILE_ACCEPT } from '../../common/constants';

import styles from './ResumeFileDropZone.module.scss';

export const ResumeFileDropZone = ({ fileName, onFileChange }: ResumeFileDropZoneProps) => {
  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    onFileChange(file);
  };

  return (
    <label className={styles.resumeFileDropZone}>
      <input
        className={styles.resumeFileDropZone__input}
        accept={RESUME_FILE_ACCEPT}
        type="file"
        onChange={onFileInputChange}
      />
      <span className={styles.resumeFileDropZone__icon} aria-hidden="true">
        <Upload aria-hidden size={18} />
      </span>
      <span>Выберите PDF, DOCX, TXT или MD</span>
      <strong className={styles.resumeFileDropZone__fileName}>{fileName || 'Файл не выбран'}</strong>
    </label>
  );
};
