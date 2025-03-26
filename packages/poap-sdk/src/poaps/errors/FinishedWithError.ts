export class FinishedWithError extends Error {
  constructor(error: string, code: string) {
    super(
      `Code: '${code}', finished with error: '${error}', please try again later `,
    );
  }
}
