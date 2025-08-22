export class CodeExpiredError extends Error {
  constructor(code: string) {
    super(`Code: '${code}', has been expired`);
  }
}
