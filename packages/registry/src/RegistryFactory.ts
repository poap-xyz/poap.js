import { HttpProvider } from './ports/PoapRegistry/HttpProvider';
import { PoapRegistryProvider } from './ports/PoapRegistry/PoapRegistryProvider';
import { RegisrtyProvider } from './ports/RegistryProvider';
import { Registry } from './Registry';

export class RegistryFactory {
  createRegistry(provider?: RegisrtyProvider): Registry {
    if (provider) {
      return new Registry(provider);
    } else {
      throw new Error('Provider is required');
    }
  }

  getDefaultProvider(
    httpProvider: HttpProvider,
    apiKey: string,
  ): RegisrtyProvider {
    return new PoapRegistryProvider(apiKey, httpProvider);
  }
}
