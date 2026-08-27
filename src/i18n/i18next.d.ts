import 'i18next';

import type { resources } from './resources';

declare module 'i18next' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: (typeof resources)['ru'];
  }
}
