import type { ModelStatusType } from '@common/types';

export const MODEL_STATUS_TITLE = {
  available: 'workspace.unsupported.titles.available',
  checking: 'workspace.unsupported.titles.checking',
  downloadable: 'workspace.unsupported.titles.downloadable',
  downloading: 'workspace.unsupported.titles.downloading',
  unavailable: 'workspace.unsupported.titles.unavailable',
  unsupported: 'workspace.unsupported.titles.unsupported',
} as const satisfies Record<ModelStatusType, string>;

export const MODEL_STATUS_DESCRIPTION = {
  available: 'workspace.unsupported.descriptions.available',
  checking: 'workspace.unsupported.descriptions.checking',
  downloadable: 'workspace.unsupported.descriptions.downloadable',
  downloading: 'workspace.unsupported.descriptions.downloading',
  unavailable: 'workspace.unsupported.descriptions.unavailable',
  unsupported: 'workspace.unsupported.descriptions.unsupported',
} as const satisfies Record<ModelStatusType, string>;
