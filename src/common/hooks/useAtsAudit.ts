import { useMemo } from 'react';

import { calculateAtsAudit } from '@services/ats-audit';
import { useResumeStore } from '@store/resumeStore';

export const useAtsAudit = () => {
  const resumeText = useResumeStore((state) => state.resumeText);
  const vacancyText = useResumeStore((state) => state.vacancyText);

  return useMemo(() => calculateAtsAudit(resumeText, vacancyText), [resumeText, vacancyText]);
};
