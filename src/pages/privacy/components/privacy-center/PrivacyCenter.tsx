import { useState } from 'react';

import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

import { getResumeWorkspaceStorageSize } from '@common/utils/resumeWorkspaceStorage';
import { Button, CollapsibleBlock, Modal } from '@components/ui';
import { useResumeStore } from '@store/resumeStore';

import { selectPrivacyCenterState } from './common/selectors';
import { getPrivacyStorageItems } from './common/utils/getPrivacyStorageItems';

import styles from './PrivacyCenter.module.scss';

const formatStorageSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  return `${(bytes / 1024).toFixed(1)} KB`;
};

export const PrivacyCenter = () => {
  const { t } = useTranslation();
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const {
    analysisHistoryCount,
    clearWorkspace,
    comparisonVacanciesCount,
    coverLetterHistoryCount,
    resumeText,
    translationHistoryCount,
  } = useResumeStore(useShallow(selectPrivacyCenterState));
  const storageSize = formatStorageSize(getResumeWorkspaceStorageSize());
  const storageItems = getPrivacyStorageItems({
    analysisHistoryCount,
    comparisonVacanciesCount,
    coverLetterHistoryCount,
    notSaved: t('workspace.privacy.notSaved'),
    resumeText,
    saved: t('workspace.privacy.saved'),
    storageSize,
    translationHistoryCount,
  });

  const onClearConfirmOpen = () => {
    setIsClearConfirmOpen(true);
  };

  const onClearConfirmClose = () => {
    setIsClearConfirmOpen(false);
  };

  const onClearConfirm = () => {
    clearWorkspace();
    setIsClearConfirmOpen(false);
  };

  return (
    <>
      <CollapsibleBlock
        className={styles.root}
        headerAction={
          <Button aria-label={t('workspace.privacy.clearAria')} size="small" onClick={onClearConfirmOpen}>
            <Trash2 aria-hidden size={16} />
          </Button>
        }
        title={t('workspace.privacy.title')}
      >
        <p className={styles.root__subtitle}>{t('workspace.privacy.subtitle')}</p>
        <dl className={styles.root__list}>
          {storageItems.map(({ labelKey, value }) => (
            <div className={styles.root__item} key={labelKey}>
              <dt>{t(labelKey)}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </CollapsibleBlock>
      <Modal
        confirmLabel={t('common.clear')}
        description={t('workspace.privacy.clearDescription')}
        isOpen={isClearConfirmOpen}
        title={t('workspace.privacy.clearTitle')}
        onClose={onClearConfirmClose}
        onConfirm={onClearConfirm}
      />
    </>
  );
};
