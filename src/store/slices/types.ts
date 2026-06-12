import type { StateCreator } from 'zustand';

import type { ResumeStoreType } from '../types';

export type ResumeSliceCreatorType<TSliceType> = StateCreator<ResumeStoreType, [], [], TSliceType>;
