export class CodeAlreadyClaimedError extends Error {
  constructor(code: string) {
    super(`Code: '${code}' already claimed `);
  }
}
