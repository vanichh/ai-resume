import { useMemo } from 'react';

import { useResumeStore } from '@store/resumeStore';

import { calculateAtsMatch } from '../utils/calculateAtsMatch';

export const useAtsMatch = () => {
  const resumeText = useResumeStore((state) => state.resumeText);
  const vacancyText = useResumeStore((state) => state.vacancyText);

  return useMemo(() => calculateAtsMatch(resumeText, vacancyText), [resumeText, vacancyText]);
};
