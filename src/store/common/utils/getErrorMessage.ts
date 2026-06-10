export function getErrorMessage(caught: unknown, fallback: string): string {
  if (caught instanceof Error) {
    return caught.message;
  }

  return fallback;
}
