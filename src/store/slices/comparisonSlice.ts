import { createId } from '@common/utils/createId';
import { analyzeResume } from '@services/resume-advisor';

import type { ResumeSliceCreatorType } from './types';

import { COMPARISON_VACANCY_LIMIT } from '../common/constants';
import { canUseModel } from '../common/utils/canUseModel';
import { getAnalysisTarget } from '../common/utils/getAnalysisTarget';
import { getErrorMessage } from '../common/utils/getErrorMessage';
import { persistWorkspace } from '../common/utils/persistWorkspace';
import type { ComparisonActionsType } from '../types';

export const createComparisonSlice: ResumeSliceCreatorType<ComparisonActionsType> = (set, get) => ({
  addComparisonVacancy() {
    set((state) => {
      if (state.comparisonVacancies.length >= COMPARISON_VACANCY_LIMIT) {
        return state;
      }

      const nextState = {
        ...state,
        comparisonVacancies: [
          ...state.comparisonVacancies,
          {
            id: createId(),
            advice: null,
            error: '',
            status: 'idle' as const,
            title: `Вакансия ${state.comparisonVacancies.length + 1}`,
            vacancyText: '',
          },
        ],
      };

      persistWorkspace(nextState);

      return {
        comparisonVacancies: nextState.comparisonVacancies,
      };
    });
  },

  async analyzeComparison() {
    const state = get();
    const { comparisonVacancies, modelStatus, resumeText, targetRole } = state;
    if (!resumeText || !canUseModel(modelStatus)) {
      return;
    }

    const vacanciesToAnalyze = comparisonVacancies.filter((vacancy) => vacancy.vacancyText.trim());
    if (vacanciesToAnalyze.length === 0) {
      return;
    }

    set({
      downloadProgress: null,
      error: '',
      comparisonVacancies: comparisonVacancies.map((vacancy) =>
        vacancy.vacancyText.trim()
          ? {
              ...vacancy,
              advice: null,
              error: '',
              status: 'analyzing' as const,
            }
          : vacancy,
      ),
    });

    for (const vacancy of vacanciesToAnalyze) {
      try {
        const advice = await analyzeResume(
          resumeText,
          getAnalysisTarget(targetRole || vacancy.title, vacancy.vacancyText),
          (downloadProgress) => {
            set({ downloadProgress });
          },
        );
        set((state) => {
          const nextState = {
            ...state,
            comparisonVacancies: state.comparisonVacancies.map((item) =>
              item.id === vacancy.id
                ? {
                    ...item,
                    advice,
                    error: '',
                    status: 'done' as const,
                  }
                : item,
            ),
          };

          persistWorkspace(nextState);

          return {
            comparisonVacancies: nextState.comparisonVacancies,
            downloadProgress: null,
          };
        });
      } catch (caught) {
        set((state) => {
          const nextState = {
            ...state,
            comparisonVacancies: state.comparisonVacancies.map((item) =>
              item.id === vacancy.id
                ? {
                    ...item,
                    advice: null,
                    error: getErrorMessage(caught, 'Не удалось сравнить с вакансией.'),
                    status: 'error' as const,
                  }
                : item,
            ),
          };

          persistWorkspace(nextState);

          return {
            comparisonVacancies: nextState.comparisonVacancies,
            downloadProgress: null,
          };
        });
      }
    }
  },

  removeComparisonVacancy(id) {
    set((state) => {
      const nextState = {
        ...state,
        comparisonVacancies: state.comparisonVacancies.filter((vacancy) => vacancy.id !== id),
      };

      persistWorkspace(nextState);

      return {
        comparisonVacancies: nextState.comparisonVacancies,
      };
    });
  },

  selectComparisonVacancy(id) {
    const state = get();
    const vacancy = state.comparisonVacancies.find((item) => item.id === id);
    if (!vacancy?.advice) {
      return;
    }

    set((state) => {
      const nextState = {
        ...state,
        advice: vacancy.advice,
        status: 'done' as const,
        vacancyText: vacancy.vacancyText,
      };

      persistWorkspace(nextState);

      return {
        advice: nextState.advice,
        status: nextState.status,
        vacancyText: nextState.vacancyText,
      };
    });
  },

  setComparisonVacancyText(id, vacancyText) {
    set((state) => {
      const nextState = {
        ...state,
        comparisonVacancies: state.comparisonVacancies.map((vacancy) =>
          vacancy.id === id
            ? {
                ...vacancy,
                advice: null,
                error: '',
                status: 'idle' as const,
                vacancyText,
              }
            : vacancy,
        ),
      };

      persistWorkspace(nextState);

      return {
        comparisonVacancies: nextState.comparisonVacancies,
      };
    });
  },

  setComparisonVacancyTitle(id, title) {
    set((state) => {
      const nextState = {
        ...state,
        comparisonVacancies: state.comparisonVacancies.map((vacancy) =>
          vacancy.id === id
            ? {
                ...vacancy,
                title,
              }
            : vacancy,
        ),
      };

      persistWorkspace(nextState);

      return {
        comparisonVacancies: nextState.comparisonVacancies,
      };
    });
  },
});
