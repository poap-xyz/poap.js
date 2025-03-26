export class MissingAuthenticationProviderError extends Error {
  constructor() {
    super(`An AuthenticationProvider is required for write operations`);
  }
}
