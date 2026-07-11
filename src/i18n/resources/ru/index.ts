import { analysis } from './analysis';
import { common } from './common';
import { home } from './home';
import { language } from './language';
import { navigation } from './navigation';

export const ru = {
  language,
  navigation,
  home,
  analysis,
  common,
} as const;
