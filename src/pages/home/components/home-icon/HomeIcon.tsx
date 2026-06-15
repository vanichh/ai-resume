import {
  BriefcaseBusiness,
  FileText,
  GitCompareArrows,
  Languages,
  LockKeyhole,
  Mail,
  ScanSearch,
  Send,
  Sparkles,
  Target,
  Upload,
} from 'lucide-react';

import type { HomeIconProps } from './types';

import styles from './HomeIcon.module.scss';

const HOME_ICON_COMPONENTS: Record<HomeIconProps['name'], typeof BriefcaseBusiness> = {
  briefcase: BriefcaseBusiness,
  fileText: FileText,
  gitCompare: GitCompareArrows,
  languages: Languages,
  lock: LockKeyhole,
  mail: Mail,
  scanSearch: ScanSearch,
  send: Send,
  sparkles: Sparkles,
  target: Target,
  upload: Upload,
};

export const HomeIcon = ({ name, size = 18 }: HomeIconProps) => {
  const Icon = HOME_ICON_COMPONENTS[name];

  return (
    <span className={styles.homeIcon}>
      <Icon aria-hidden size={size} />
    </span>
  );
};
