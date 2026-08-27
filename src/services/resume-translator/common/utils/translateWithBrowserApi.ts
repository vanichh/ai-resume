import type { BrowserTranslationLanguageCodeType } from '@common/types';

const LANGUAGE_DETECTION_SAMPLE_MAX_LENGTH = 4000;
const LANGUAGE_DETECTION_MIN_CONFIDENCE = 0.5;

const addDownloadProgressListener = (monitor: EventTarget, onDownloadProgress?: (progress: number) => void): void => {
  monitor.addEventListener('downloadprogress', (event) => {
    const progressEvent = event as ProgressEvent;
    onDownloadProgress?.(progressEvent.loaded);
  });
};

const detectSourceLanguage = async (
  resumeText: string,
  onDownloadProgress?: (progress: number) => void,
): Promise<string | null> => {
  if (!globalThis.LanguageDetector) {
    return null;
  }

  const availability = await globalThis.LanguageDetector.availability();
  if (availability === 'unavailable') {
    return null;
  }

  const detector = await globalThis.LanguageDetector.create({
    monitor: (monitor) => {
      addDownloadProgressListener(monitor, onDownloadProgress);
    },
  });

  try {
    const results = await detector.detect(resumeText.slice(0, LANGUAGE_DETECTION_SAMPLE_MAX_LENGTH));
    const bestMatch = results[0];

    if (!bestMatch || bestMatch.confidence < LANGUAGE_DETECTION_MIN_CONFIDENCE) {
      return null;
    }

    return bestMatch.detectedLanguage;
  } finally {
    detector.destroy();
  }
};

export const translateWithBrowserApi = async (
  resumeChunks: string[],
  targetLanguage: BrowserTranslationLanguageCodeType,
  onDownloadProgress?: (progress: number) => void,
): Promise<string | null> => {
  if (!globalThis.Translator || !globalThis.LanguageDetector) {
    return null;
  }

  const sourceLanguage = await detectSourceLanguage(resumeChunks.join('\n\n'), onDownloadProgress);
  if (!sourceLanguage || sourceLanguage === targetLanguage) {
    return null;
  }

  const options = {
    sourceLanguage,
    targetLanguage,
  };
  const availability = await globalThis.Translator.availability(options);

  if (availability === 'unavailable') {
    return null;
  }

  const translator = await globalThis.Translator.create({
    ...options,
    monitor: (monitor) => {
      addDownloadProgressListener(monitor, onDownloadProgress);
    },
  });

  try {
    const translatedChunks: string[] = [];

    for (const resumeChunk of resumeChunks) {
      translatedChunks.push((await translator.translate(resumeChunk)).trim());
    }

    return translatedChunks.join('\n\n');
  } finally {
    translator.destroy();
  }
};
