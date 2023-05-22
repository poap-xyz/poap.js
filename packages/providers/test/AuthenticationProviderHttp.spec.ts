import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { AuthenticationProviderHttp } from '../src';

const getAuthUrl = (authServer: string): string => {
  return `https://${authServer}/oauth/token`;
};

describe('AuthenticationProviderHttp', () => {
  jest.useFakeTimers();

  const CLIENT_ID = 'CLIENT_ID';
  const CLIENT_SECRET = 'CLIENT_SECRET';
  const ACCESS_TOKEN = 'ACCESS_TOKEN';
  const EXPIRES_IN = 3600;
  const AUDIENCE = 'https://audience.test';
  const AUTH_SERVER = 'https://auth.test';

  let axiosMocked: MockAdapter;
  let axiosPostSpy: jest.SpyInstance;

  beforeEach(() => {
    axiosMocked = new MockAdapter(axios);
    axiosPostSpy = jest.spyOn(axios, 'post');
  });

  it('should return an Access Token', async () => {
    const provider = new AuthenticationProviderHttp(
      CLIENT_ID,
      CLIENT_SECRET,
      AUTH_SERVER,
    );
    axiosMocked.onPost(getAuthUrl(AUTH_SERVER)).reply(200, {
      access_token: ACCESS_TOKEN,
      expires_in: EXPIRES_IN,
    });

    const result = await provider.getJWT(AUDIENCE);

    expect(result).toEqual(ACCESS_TOKEN);
  });

  it('should request only one Access Token when Token is still valid', async () => {
    const provider = new AuthenticationProviderHttp(
      CLIENT_ID,
      CLIENT_SECRET,
      AUTH_SERVER,
    );
    axiosMocked.onPost(getAuthUrl(AUTH_SERVER)).reply(200, {
      access_token: ACCESS_TOKEN,
      expires_in: EXPIRES_IN,
    });

    const accessToken1 = await provider.getJWT(AUDIENCE);
    const accessToken2 = await provider.getJWT(AUDIENCE);

    expect(accessToken1).toEqual(ACCESS_TOKEN);
    expect(accessToken2).toEqual(ACCESS_TOKEN);
    expect(axiosPostSpy).toHaveBeenCalledTimes(1);
  });

  it('should request a new Access Token when Token is expired', async () => {
    const provider = new AuthenticationProviderHttp(
      CLIENT_ID,
      CLIENT_SECRET,
      AUTH_SERVER,
    );
    axiosMocked.onPost(getAuthUrl(AUTH_SERVER)).reply(200, {
      access_token: ACCESS_TOKEN,
      expires_in: EXPIRES_IN,
    });

    const accessToken1 = await provider.getJWT(AUDIENCE);

    jest.advanceTimersByTime(EXPIRES_IN * 1000 + 1);

    const accessToken2 = await provider.getJWT(AUDIENCE);

    expect(accessToken1).toEqual(ACCESS_TOKEN);
    expect(accessToken2).toEqual(ACCESS_TOKEN);
    expect(axiosPostSpy).toHaveBeenCalledTimes(2);
  });
});
