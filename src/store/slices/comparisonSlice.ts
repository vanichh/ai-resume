import { createId } from '@common/utils/createId';

import { analyzeResume } from '@services/resume-advisor';

import type { ResumeSliceCreator } from './types';

import { COMPARISON_VACANCY_LIMIT } from '../common/constants';
import { canUseModel } from '../common/utils/canUseModel';
import { getAnalysisTarget } from '../common/utils/getAnalysisTarget';
import { getErrorMessage } from '../common/utils/getErrorMessage';
import { persistWorkspace } from '../common/utils/persistWorkspace';
import type { ComparisonActions } from '../types';

export const createComparisonSlice: ResumeSliceCreator<ComparisonActions> = (set, get) => ({
  addComparisonVacancy() {
    const { comparisonVacancies } = get();
    if (comparisonVacancies.length >= COMPARISON_VACANCY_LIMIT) {
      return;
    }

    set({
      comparisonVacancies: [
        ...comparisonVacancies,
        {
          id: createId(),
          advice: null,
          error: '',
          status: 'idle',
          title: `Вакансия ${comparisonVacancies.length + 1}`,
          vacancyText: '',
        },
      ],
    });
    persistWorkspace(get());
  },

  async analyzeComparison() {
    const { comparisonVacancies, modelStatus, resumeText, targetRole } = get();
    if (!resumeText || !canUseModel(modelStatus)) {
      return;
    }

    const vacanciesToAnalyze = comparisonVacancies.filter((vacancy) => vacancy.vacancyText.trim());
    if (vacanciesToAnalyze.length === 0) {
      return;
    }

    set({
      error: '',
      comparisonVacancies: comparisonVacancies.map((vacancy) =>
        vacancy.vacancyText.trim()
          ? {
              ...vacancy,
              advice: null,
              error: '',
              status: 'analyzing',
            }
          : vacancy,
      ),
    });

    for (const vacancy of vacanciesToAnalyze) {
      try {
        const advice = await analyzeResume(
          resumeText,
          getAnalysisTarget(targetRole || vacancy.title, vacancy.vacancyText),
        );
        set({
          comparisonVacancies: get().comparisonVacancies.map((item) =>
            item.id === vacancy.id
              ? {
                  ...item,
                  advice,
                  error: '',
                  status: 'done',
                }
              : item,
          ),
        });
      } catch (caught) {
        set({
          comparisonVacancies: get().comparisonVacancies.map((item) =>
            item.id === vacancy.id
              ? {
                  ...item,
                  advice: null,
                  error: getErrorMessage(caught, 'Не удалось сравнить с вакансией.'),
                  status: 'error',
                }
              : item,
          ),
        });
      }
      persistWorkspace(get());
    }
  },

  removeComparisonVacancy(id) {
    set({
      comparisonVacancies: get().comparisonVacancies.filter((vacancy) => vacancy.id !== id),
    });
    persistWorkspace(get());
  },

  selectComparisonVacancy(id) {
    const vacancy = get().comparisonVacancies.find((item) => item.id === id);
    if (!vacancy?.advice) {
      return;
    }

    set({
      advice: vacancy.advice,
      status: 'done',
      vacancyText: vacancy.vacancyText,
    });
    persistWorkspace(get());
  },

  setComparisonVacancyText(id, vacancyText) {
    set({
      comparisonVacancies: get().comparisonVacancies.map((vacancy) =>
        vacancy.id === id
          ? {
              ...vacancy,
              advice: null,
              error: '',
              status: 'idle',
              vacancyText,
            }
          : vacancy,
      ),
    });
    persistWorkspace(get());
  },

  setComparisonVacancyTitle(id, title) {
    set({
      comparisonVacancies: get().comparisonVacancies.map((vacancy) =>
        vacancy.id === id
          ? {
              ...vacancy,
              title,
            }
          : vacancy,
      ),
    });
    persistWorkspace(get());
  },
});
