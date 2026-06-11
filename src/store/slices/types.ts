import type { StateCreator } from 'zustand';

import type { ResumeStore } from '../types';

export type ResumeSliceCreator<TSlice> = StateCreator<ResumeStore, [], [], TSlice>;
