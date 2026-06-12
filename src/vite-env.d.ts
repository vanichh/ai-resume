/// <reference types="vite/client" />

type LanguageModelAvailabilityType = 'unavailable' | 'downloadable' | 'downloading' | 'available';

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
  var LanguageModel:
    | {
        availability(options?: LanguageModelCreateOptionsType): Promise<LanguageModelAvailabilityType>;
        create(options?: LanguageModelCreateOptionsType): Promise<LanguageModelSessionType>;
      }
    | undefined;
}

export {};
