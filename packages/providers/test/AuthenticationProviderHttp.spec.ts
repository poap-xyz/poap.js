import { mock } from 'node:test';
import { AuthenticationProviderHttp } from '../src';
import { jest } from '@jest/globals';

describe('AuthenticationProviderHttp', () => {
  const CLIENT_ID = 'CLIENT_ID';
  const CLIENT_SECRET = 'CLIENT_SECRET';
  const ACCESS_TOKEN = 'ACCESS_TOKEN';
  const EXPIRES_IN = 3600;
  const AUDIENCE = 'audience.test';
  const AUTH_SERVER = 'auth.test';

  it('should return an Access Token', async () => {
    const provider = new AuthenticationProviderHttp(
      CLIENT_ID,
      CLIENT_SECRET,
      AUTH_SERVER,
    );

    mock.method(global, 'fetch', () => {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            access_token: ACCESS_TOKEN,
            expires_in: EXPIRES_IN,
          }),
      });
    });

    const result = await provider.getJWT(AUDIENCE);

    expect(result).toEqual(ACCESS_TOKEN);

    mock.reset();
  });

  it('should request only one Access Token when Token is still valid', async () => {
    const provider = new AuthenticationProviderHttp(
      CLIENT_ID,
      CLIENT_SECRET,
      AUTH_SERVER,
    );

    mock.method(global, 'fetch', () => {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            access_token: ACCESS_TOKEN,
            expires_in: EXPIRES_IN,
          }),
      });
    });

    const accessToken1 = await provider.getJWT(AUDIENCE);
    const accessToken2 = await provider.getJWT(AUDIENCE);

    expect(accessToken1).toEqual(ACCESS_TOKEN);
    expect(accessToken2).toEqual(ACCESS_TOKEN);

    mock.reset();
  });

  it('should request a new Access Token when Token is expired', async () => {
    const provider = new AuthenticationProviderHttp(
      CLIENT_ID,
      CLIENT_SECRET,
      AUTH_SERVER,
    );

    mock.method(global, 'fetch', () => {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            access_token: ACCESS_TOKEN,
            expires_in: EXPIRES_IN,
          }),
      });
    });

    const accessToken1 = await provider.getJWT(AUDIENCE);

    jest.advanceTimersByTime(EXPIRES_IN * 1000 + 1);

    mock.method(global, 'fetch', () => {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            access_token: ACCESS_TOKEN,
            expires_in: EXPIRES_IN,
          }),
      });
    });

    const accessToken2 = await provider.getJWT(AUDIENCE);

    expect(accessToken1).toEqual(ACCESS_TOKEN);
    expect(accessToken2).toEqual(ACCESS_TOKEN);

    mock.reset();
  });
});
