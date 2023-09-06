/**
 * Sleep for a specified number of milliseconds.
 * @param ms Number of milliseconds to sleep.
 * @returns Promise that resolves after the specified delay.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
