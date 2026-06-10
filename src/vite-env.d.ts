/// <reference types="vite/client" />

type LanguageModelAvailability = 'unavailable' | 'downloadable' | 'downloading' | 'available';

type LanguageModelMessage =
  | string
  | Array<{
      role: 'system' | 'user' | 'assistant';
      content: string;
      prefix?: boolean;
    }>;

type LanguageModelSession = EventTarget & {
  prompt(
    input: LanguageModelMessage,
    options?: { signal?: AbortSignal; responseConstraint?: unknown },
  ): Promise<string>;
  promptStreaming(
    input: LanguageModelMessage,
    options?: { signal?: AbortSignal; responseConstraint?: unknown },
  ): ReadableStream<string>;
  destroy(): void;
};

type LanguageModelCreateOptions = {
  initialPrompts?: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
  signal?: AbortSignal;
  monitor?: (monitor: EventTarget) => void;
};

declare global {
  var LanguageModel:
    | {
        availability(options?: unknown): Promise<LanguageModelAvailability>;
        create(options?: LanguageModelCreateOptions): Promise<LanguageModelSession>;
      }
    | undefined;
}

export {};
