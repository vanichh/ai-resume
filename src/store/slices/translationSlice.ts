import { translateResume } from '@services/resume-translator';

import type { ResumeSliceCreatorType } from './types';

import { getErrorMessage } from '../common/utils/getErrorMessage';
import { persistWorkspace } from '../common/utils/persistWorkspace';
import type { TranslationActionsType } from '../types';

export const createTranslationSlice: ResumeSliceCreatorType<TranslationActionsType> = (set, get) => ({
  selectTranslation(id) {
    const state = get();
    const translation = state.translationHistory.find((item) => item.id === id) ?? null;
    set((currentState) => {
      const nextState = {
        ...currentState,
        translation,
      };

      persistWorkspace(nextState);

      return {
        translation: nextState.translation,
      };
    });
  },

  setTranslationText(text) {
    set((state) => {
      if (!state.translation) {
        return state;
      }

      const updatedTranslation = {
        ...state.translation,
        text,
      };

      const nextState = {
        ...state,
        translation: updatedTranslation,
        translationHistory: state.translationHistory.map((item) =>
          item.id === updatedTranslation.id ? updatedTranslation : item,
        ),
      };

      persistWorkspace(nextState);

      return {
        translation: nextState.translation,
        translationHistory: nextState.translationHistory,
      };
    });
  },

  setTranslationLanguage(translationLanguage) {
    set((state) => {
      const nextState = {
        ...state,
        translationLanguage,
      };

      persistWorkspace(nextState);

      return {
        translationLanguage: nextState.translationLanguage,
      };
    });
  },

  setTranslationTone(translationTone) {
    set((state) => {
      const nextState = {
        ...state,
        translationTone,
      };

      persistWorkspace(nextState);

      return {
        translationTone: nextState.translationTone,
      };
    });
  },

  async translate() {
    const state = get();
    const { advice, resumeText, translationLanguage, translationTone } = state;

    set({
      downloadProgress: null,
      error: '',
      status: 'translating',
      translation: null,
    });

    try {
      const translation = await translateResume(
        resumeText,
        translationLanguage,
        translationTone,
        (downloadProgress) => {
          set({ downloadProgress });
        },
      );

      set((state) => {
        const nextState = {
          ...state,
          status: advice ? ('done' as const) : ('ready' as const),
          translation,
          translationHistory: [
            translation,
            ...state.translationHistory.filter((item) => item.id !== translation.id),
          ].slice(0, 12),
        };

        persistWorkspace(nextState);

        return {
          downloadProgress: null,
          status: nextState.status,
          translation: nextState.translation,
          translationHistory: nextState.translationHistory,
        };
      });
    } catch (caught) {
      set({
        downloadProgress: null,
        error: getErrorMessage(caught, 'Не удалось перевести резюме.'),
        status: 'error',
      });
    }
  },
});
