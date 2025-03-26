import {
  AuthenticationProvider,
  AuthenticationProviderHttp,
  PoapCompass,
  PoapMomentsApi,
} from '@poap-xyz/poap-sdk';
import { MomentsClient } from '../MomentsClient';
import { GetMomentsDefaultClientOptions } from './options/GetMomentsDefaultClientOptions';

export class MomentsClientFactory {
  private static readonly DEFAULT_OAUTH_SERVER = 'https://accounts.poap.tech';

  public static getMomentsDefaultClient(
    params: GetMomentsDefaultClientOptions,
  ): MomentsClient {
    const compassProvider = new PoapCompass({
      apiKey: params.compass.compassApiKey,
      baseUrl: params.compass.compassBaseUrl,
    });

    const authenticationProvider =
      MomentsClientFactory.getAuthenticationProvider(params);

    const momentsAPI = new PoapMomentsApi({
      baseUrl: params.moments.momentsBaseUrl,
      authenticationProvider,
    });

    return new MomentsClient(momentsAPI, compassProvider);
  }

  private static getAuthenticationProvider(
    params: GetMomentsDefaultClientOptions,
  ): AuthenticationProvider {
    if ('authenticationProvider' in params.moments) {
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
      params.moments.oAuthCredentials.oAuthServerDomain ??
        MomentsClientFactory.DEFAULT_OAUTH_SERVER,
    );
  }
}
