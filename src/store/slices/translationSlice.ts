import { translateResume } from '@services/resume-translator';

import type { ResumeSliceCreator } from './types';

import { getErrorMessage } from '../common/utils/getErrorMessage';
import { persistWorkspace } from '../common/utils/persistWorkspace';
import type { TranslationActions } from '../types';

export const createTranslationSlice: ResumeSliceCreator<TranslationActions> = (set, get) => ({
  selectTranslation(id) {
    const translation = get().translationHistory.find((item) => item.id === id) ?? null;
    set({ translation });
    persistWorkspace(get());
  },

  setTranslationText(text) {
    const { translation, translationHistory } = get();
    if (!translation) {
      return;
    }

    const updatedTranslation = {
      ...translation,
      text,
    };

    set({
      translation: updatedTranslation,
      translationHistory: translationHistory.map((item) =>
        item.id === updatedTranslation.id ? updatedTranslation : item,
      ),
    });
    persistWorkspace(get());
  },

  setTranslationLanguage(translationLanguage) {
    set({ translationLanguage });
    persistWorkspace(get());
  },

  setTranslationTone(translationTone) {
    set({ translationTone });
    persistWorkspace(get());
  },

  async translate() {
    const { advice, resumeText, translationLanguage, translationTone } = get();

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

      const translationHistory = [
        translation,
        ...get().translationHistory.filter((item) => item.id !== translation.id),
      ].slice(0, 12);

      set({
        status: advice ? 'done' : 'ready',
        translation,
        translationHistory,
      });
      persistWorkspace(get());
    } catch (caught) {
      set({
        error: getErrorMessage(caught, 'Не удалось перевести резюме.'),
        status: 'error',
      });
    }
  },
});
