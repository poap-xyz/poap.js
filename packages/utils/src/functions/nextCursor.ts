export function nextCursor(
  length: number,
  limit: number,
  offset: number,
): number | null {
  const endIndex = offset + length;
  return endIndex < offset + limit ? null : endIndex;
}
