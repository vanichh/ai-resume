/// <reference types="vite/client" />

type LanguageModelAvailabilityType = 'unavailable' | 'downloadable' | 'downloading' | 'available';

type BrowserAiAvailabilityType = 'unavailable' | 'downloadable' | 'downloading' | 'available';

type BrowserAiMonitorOptionsType = {
  monitor?: (monitor: EventTarget) => void;
};

type LanguageDetectorResultType = {
  confidence: number;
  detectedLanguage: string;
};

type LanguageDetectorSessionType = {
  destroy(): void;
  detect(input: string): Promise<LanguageDetectorResultType[]>;
};

type TranslatorCreateOptionsType = BrowserAiMonitorOptionsType & {
  sourceLanguage: string;
  targetLanguage: string;
};

type TranslatorSessionType = {
  destroy(): void;
  translate(input: string): Promise<string>;
  translateStreaming(input: string): ReadableStream<string>;
};

type LanguageModelLanguageCodeType = 'de' | 'en' | 'es' | 'fr' | 'ja';

type LanguageModelMessageType =
  | string
  | Array<{
      role: 'system' | 'user' | 'assistant';
      content: string;
      prefix?: boolean;
    }>;

type LanguageModelSessionType = EventTarget & {
  prompt(
    input: LanguageModelMessageType,
    options?: { signal?: AbortSignal; responseConstraint?: unknown },
  ): Promise<string>;
  promptStreaming(
    input: LanguageModelMessageType,
    options?: { signal?: AbortSignal; responseConstraint?: unknown },
  ): ReadableStream<string>;
  destroy(): void;
};

type LanguageModelCreateOptionsType = {
  expectedOutputs?: Array<{ type: 'text'; languages: LanguageModelLanguageCodeType[] }>;
  initialPrompts?: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
  signal?: AbortSignal;
  monitor?: (monitor: EventTarget) => void;
};

declare global {
  var LanguageDetector:
    | {
        availability(): Promise<BrowserAiAvailabilityType>;
        create(options?: BrowserAiMonitorOptionsType): Promise<LanguageDetectorSessionType>;
      }
    | undefined;

  var LanguageModel:
    | {
        availability(options?: LanguageModelCreateOptionsType): Promise<LanguageModelAvailabilityType>;
        create(options?: LanguageModelCreateOptionsType): Promise<LanguageModelSessionType>;
      }
    | undefined;

  var Translator:
    | {
        availability(options: TranslatorCreateOptionsType): Promise<BrowserAiAvailabilityType>;
        create(options: TranslatorCreateOptionsType): Promise<TranslatorSessionType>;
      }
    | undefined;
}

export {};
