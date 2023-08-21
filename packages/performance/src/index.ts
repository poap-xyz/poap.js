import { performance } from 'perf_hooks';

export async function measurePerformance(
  fn: () => Promise<void>,
  name: string,
): Promise<void> {
  const start = performance.now();
  await fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds to execute.`);
}
