import { MomentsClient } from 'moments';
import {
  AuthenticationProvider,
  AuthenticationProviderHttp,
  PoapCompass,
  PoapMomentsApi,
} from '@poap-xyz/providers';

interface GetMomentsDefaultClientOptions {
  moments: {
    momentsBaseUrl?: string;
    /**
     * The authentication provider used for authenticating requests to the moments API.
     * If this is provided, oAuthAuthentication will be ignored.
     */
    authenticationProvider?: AuthenticationProvider;
    /**
     * The OAuth authentication configuration used for authenticating requests to the moments API.
     * If this is provided, it will be used to create an `AuthenticationProviderOAuth` instance.
     */
    oAuthCredentials?: {
      clientId: string;
      clientSecret: string;
      oAuthServerDomain?: string;
    };
  };
  compass?: {
    compassApiKey?: string;
    compassBaseUrl?: string;
  };
}

const DEFAULT_OAUTH_SERVER = 'https://accounts.poap.tech';

const getAuthenticationProvider = (
  params: GetMomentsDefaultClientOptions,
): AuthenticationProvider => {
  if (params.moments.authenticationProvider) {
    return params.moments.authenticationProvider;
  }

  if (!params.moments.oAuthCredentials) {
    throw new Error(
      'Either an authentication provider or an OAuth authentication configuration must be provided for Moments.',
    );
  }

  return new AuthenticationProviderHttp(
    params.moments.oAuthCredentials.clientId,
    params.moments.oAuthCredentials.clientSecret,
    params.moments.oAuthCredentials.oAuthServerDomain ?? DEFAULT_OAUTH_SERVER,
  );
};

const getMomentsDefaultClient = (
  params: GetMomentsDefaultClientOptions,
): MomentsClient => {
  const compassProvider = new PoapCompass({
    apiKey: params.compass?.compassApiKey ?? '',
    baseUrl: params.compass?.compassBaseUrl,
  });

  const authenticationProvider = getAuthenticationProvider(params);

  const momentsAPI = new PoapMomentsApi({
    baseUrl: params.moments.momentsBaseUrl,
    authenticationProvider,
  });

  return new MomentsClient(momentsAPI, compassProvider);
};

export { getMomentsDefaultClient };
