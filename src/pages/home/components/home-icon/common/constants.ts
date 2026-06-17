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

import type { HomeIconProps } from '../types';

export const HOME_ICON_COMPONENTS: Record<HomeIconProps['name'], typeof BriefcaseBusiness> = {
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
