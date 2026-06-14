export const normalizeDownloadProgress = (downloadProgress: number) => {
  if (!Number.isFinite(downloadProgress)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(downloadProgress <= 1 ? downloadProgress * 100 : downloadProgress)));
};
