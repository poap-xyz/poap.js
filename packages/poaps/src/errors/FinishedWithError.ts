export class FinishedWithError extends Error {
  constructor(code: string) {
    super(
      `Claim for ode: '${code}', finished with error, please try again later `,
    );
  }
}
