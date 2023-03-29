import { HttpProvider } from './ports/PoapRegistry/HttpProvider';
import { PoapRegistryProvider } from './ports/PoapRegistry/PoapRegistryProvider';
import { RegistryProvider } from './ports/RegistryProvider';
import { Registry } from './Registry';

export class RegistryFactory {
  createRegistry(provider: RegistryProvider): Registry {
    return new Registry(provider);
  }

  getDefaultProvider(
    httpProvider: HttpProvider,
    apiKey: string,
  ): RegistryProvider {
    return new PoapRegistryProvider(apiKey, httpProvider);
  }
}
