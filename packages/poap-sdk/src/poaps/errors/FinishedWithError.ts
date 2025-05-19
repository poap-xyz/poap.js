export class FinishedWithError extends Error {
  constructor(reason: string) {
    super(`Minting finished with error: '${reason}', please try again later`);
  }
}
