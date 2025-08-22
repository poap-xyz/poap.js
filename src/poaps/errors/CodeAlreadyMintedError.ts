export class CodeAlreadyMintedError extends Error {
  constructor(code: string) {
    super(`Code: '${code}' already minted `);
  }
}
