import { createId } from '@common/utils/createId';

import { analyzeResume } from '@services/resume-advisor';

import type { ResumeSliceCreator } from './types';

import { ANALYSIS_HISTORY_LIMIT, MIN_RESUME_TEXT_LENGTH } from '../common/constants';
import { getAnalysisTarget } from '../common/utils/getAnalysisTarget';
import { getErrorMessage } from '../common/utils/getErrorMessage';
import { persistWorkspace } from '../common/utils/persistWorkspace';
import { resetComparisonResults } from '../common/utils/resetComparisonResults';
import type { ResumeActions } from '../types';

export const createResumeSlice: ResumeSliceCreator<ResumeActions> = (set, get) => ({
  async analyze() {
    const { fileName, resumeText, targetRole, vacancyText } = get();

    set({
      advice: null,
      coverLetter: null,
      coverLetterStatus: 'idle',
      downloadProgress: null,
      error: '',
      status: 'analyzing',
    });

    try {
      const advice = await analyzeResume(resumeText, getAnalysisTarget(targetRole, vacancyText), (downloadProgress) => {
        set({ downloadProgress });
      });
      const historyItem = {
        id: createId(),
        advice,
        createdAt: new Date().toISOString(),
        fileName,
        note: '',
        resumeText,
        targetRole,
        vacancyText,
      };

      set({
        advice,
        analysisHistory: [
          historyItem,
          ...get().analysisHistory.filter(
            (item) =>
              item.resumeText !== resumeText || item.targetRole !== targetRole || item.vacancyText !== vacancyText,
          ),
        ].slice(0, ANALYSIS_HISTORY_LIMIT),
        status: 'done',
      });
      persistWorkspace(get());
    } catch (caught) {
      set({
        error: getErrorMessage(caught, 'Не удалось получить рекомендации.'),
        status: 'error',
      });
    }
  },

  async parseFile(file) {
    set({
      advice: null,
      coverLetter: null,
      coverLetterStatus: 'idle',
      downloadProgress: null,
      error: '',
      fileName: file.name,
      status: 'parsing',
      translation: null,
    });

    try {
      const { parseResumeFile } = await import('@services/resume-parser');
      const resumeText = await parseResumeFile(file);
      if (resumeText.length < MIN_RESUME_TEXT_LENGTH) {
        throw new Error('В файле слишком мало текста для нормального анализа.');
      }

      set({
        resumeText,
        status: 'ready',
        comparisonVacancies: resetComparisonResults(get()),
      });
      persistWorkspace(get());
    } catch (caught) {
      set({
        error: getErrorMessage(caught, 'Не удалось прочитать файл.'),
        resumeText: '',
        status: 'error',
      });
    }
  },

  setResumeText(resumeText) {
    set({
      advice: null,
      comparisonVacancies: resetComparisonResults(get()),
      coverLetter: null,
      coverLetterStatus: 'idle',
      resumeText,
      status: resumeText ? 'ready' : 'idle',
      translation: null,
    });
    persistWorkspace(get());
  },

  setTargetRole(targetRole) {
    set({
      advice: null,
      coverLetter: null,
      coverLetterStatus: 'idle',
      status: get().resumeText ? 'ready' : 'idle',
      targetRole,
    });
    persistWorkspace(get());
  },

  setVacancyText(vacancyText) {
    set({
      advice: null,
      coverLetter: null,
      coverLetterStatus: 'idle',
      status: get().resumeText ? 'ready' : 'idle',
      vacancyText,
    });
    persistWorkspace(get());
  },
});
