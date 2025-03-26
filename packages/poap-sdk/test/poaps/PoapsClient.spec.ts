import { MockProxy, anyString, mock } from 'jest-mock-extended';
import { CompassProvider, TokensApiProvider } from '@poap-sdk/providers';
import { PoapsClient } from '../src/PoapsClient';

describe('PoapsClient', () => {
  let compassProviderMock: MockProxy<CompassProvider>;
  let tokensApiProviderMock: MockProxy<TokensApiProvider>;

  let poapsClient: PoapsClient;

  beforeEach(() => {
    compassProviderMock = mock<CompassProvider>();
    tokensApiProviderMock = mock<TokensApiProvider>();

    poapsClient = new PoapsClient(compassProviderMock, tokensApiProviderMock);
  });

  describe('fetch', () => {
    it('request all tokens except zero address and dead address when no filter is given', async () => {
      // Given
      compassProviderMock.request.mockResolvedValue({
        data: {
          poaps: [],
        },
      });

      // When
      await poapsClient.fetch({
        limit: 1,
        offset: 0,
      });

      // Then
      expect(compassProviderMock.request).toHaveBeenCalledWith(anyString(), {
        limit: 1,
        offset: 0,
        orderBy: {},
        where: {
          collector_address: {
            _nin: [
              '0x0000000000000000000000000000000000000000',
              '0x000000000000000000000000000000000000dead',
            ],
          },
        },
      });
    });

    it('request all tokens including zero address and dead address when those filters are given on false', async () => {
      // Given
      compassProviderMock.request.mockResolvedValue({
        data: {
          poaps: [],
        },
      });

      // When
      await poapsClient.fetch({
        limit: 1,
        offset: 0,
        filterZeroAddress: false,
        filterDeadAddress: false,
      });

      // Then
      expect(compassProviderMock.request).toHaveBeenCalledWith(anyString(), {
        limit: 1,
        offset: 0,
        orderBy: {},
        where: {},
      });
    });

    it('request all tokens except dead address but include zero address when filter is given on false', async () => {
      // Given
      compassProviderMock.request.mockResolvedValue({
        data: {
          poaps: [],
        },
      });

      // When
      await poapsClient.fetch({
        limit: 1,
        offset: 0,
        filterZeroAddress: false,
      });

      // Then
      expect(compassProviderMock.request).toHaveBeenCalledWith(anyString(), {
        limit: 1,
        offset: 0,
        orderBy: {},
        where: {
          collector_address: {
            _neq: '0x000000000000000000000000000000000000dead',
          },
        },
      });
    });

    it('request all tokens except zero address but include dead address when filter is given on false', async () => {
      // Given
      compassProviderMock.request.mockResolvedValue({
        data: {
          poaps: [],
        },
      });

      // When
      await poapsClient.fetch({
        limit: 1,
        offset: 0,
        filterDeadAddress: false,
      });

      // Then
      expect(compassProviderMock.request).toHaveBeenCalledWith(anyString(), {
        limit: 1,
        offset: 0,
        orderBy: {},
        where: {
          collector_address: {
            _neq: '0x0000000000000000000000000000000000000000',
          },
        },
      });
    });

    it('request tokens for collector when collectorAddress filter is given', async () => {
      // Given
      compassProviderMock.request.mockResolvedValue({
        data: {
          poaps: [],
        },
      });

      // When
      await poapsClient.fetch({
        limit: 1,
        offset: 0,
        collectorAddress: '0xf6b6f07862a02c85628b3a9688beae07fea9c863',
      });

      // Then
      expect(compassProviderMock.request).toHaveBeenCalledWith(anyString(), {
        limit: 1,
        offset: 0,
        orderBy: {},
        where: {
          collector_address: {
            _eq: '0xf6b6f07862a02c85628b3a9688beae07fea9c863',
          },
        },
      });
    });

    it('request tokens for collector when collectorAddress filter is given without null address filter even when given', async () => {
      // Given
      compassProviderMock.request.mockResolvedValue({
        data: {
          poaps: [],
        },
      });

      // When
      await poapsClient.fetch({
        limit: 1,
        offset: 0,
        collectorAddress: '0xf6b6f07862a02c85628b3a9688beae07fea9c863',
        filterZeroAddress: true,
        filterDeadAddress: true,
      });

      // Then
      expect(compassProviderMock.request).toHaveBeenCalledWith(anyString(), {
        limit: 1,
        offset: 0,
        orderBy: {},
        where: {
          collector_address: {
            _eq: '0xf6b6f07862a02c85628b3a9688beae07fea9c863',
          },
        },
      });
    });
  });
});
