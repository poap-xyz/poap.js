export class FinishedWithError extends Error {
  constructor(error: string) {
    super(`Finished with error: '${error}', please try again later `);
  }
}
