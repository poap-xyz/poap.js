export function toPOAPDate(date: Date): string {
  return date
    .toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '-');
}
