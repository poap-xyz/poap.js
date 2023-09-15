import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { PoapDropApi } from '../src/core/PoapDropApi/PoapDropApi';
import {
  CreateDropInput,
  UpdateDropInput,
} from '../src/ports/DropApiProvider/Types/input';
import { DropResponse } from '../src/ports/DropApiProvider/Types/response';

describe('PoapDropApi', () => {
  let mock;
  let apiKey;
  let baseUrl;
  let api;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    apiKey = 'test-api-key';
    baseUrl = 'https://api.poap.test';
    api = new PoapDropApi({ apiKey, baseUrl });
  });

  afterEach(() => {
    mock.reset();
  });

  describe('createDrop', () => {
    it('should create a drop successfully', async () => {
      const input: CreateDropInput = {
        name: 'Test Event',
        description: 'A test event',
        city: 'New York',
        country: 'USA',
        start_date: '2023-01-01T00:00:00.000Z',
        end_date: '2023-01-02T00:00:00.000Z',
        expiry_date: '2023-01-31T00:00:00.000Z',
        event_url: 'https://example.com/test-event',
        virtual_event: true,
        image: Buffer.from('Test Image'),
        filename: 'test-image.png',
        contentType: 'image/png',
        secret_code: 'test123',
        email: 'test@example.com',
        requested_codes: 100,
        private_event: true,
      };

      const mockResponse: DropResponse = {
        id: 1,
        fancy_id: 'test_event',
        name: input.name,
        description: input.description,
        city: input.city,
        country: input.country,
        event_url: input.event_url,
        image_url: 'https://example.com/test-image.png',
        animation_url: 'https://example.com/test-animation.mp4',
        year: 2023,
        start_date: input.start_date,
        end_date: input.end_date,
        expiry_date: input.expiry_date,
        from_admin: false,
        virtual_event: input.virtual_event,
        private_event: true,
        channel: 'test_channel',
        platform: 'test_platform',
        location_type: 'test_location_type',
        timezone: 'UTC',
        created_date: '2023-01-01T00:00:00.000Z',
      };

      mock.onPost(`${baseUrl}/events`).reply(200, mockResponse);

      const result = await api.createDrop(input);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateDrop', () => {
    it('should update a drop successfully', async () => {
      const input: UpdateDropInput = {
        name: 'Updated Test Event',
        description: 'An updated test event',
        city: 'Los Angeles',
        country: 'USA',
        start_date: '2023-02-01T00:00:00.000Z',
        end_date: '2023-02-02T00:00:00.000Z',
        expiry_date: '2023-02-28T00:00:00.000Z',
        event_url: 'https://example.com/updated-test-event',
        virtual_event: true,
        secret_code: 'updated_test123',
        private_event: true,
      };

      const mockResponse: DropResponse = {
        id: 1,
        fancy_id: 'test_event',
        name: input.name,
        description: input.description,
        city: input.city,
        country: input.country,
        event_url: input.event_url,
        image_url: 'https://example.com/test-image.png',
        animation_url: 'https://example.com/test-animation.mp4',
        year: 2023,
        start_date: input.start_date,
        end_date: input.end_date,
        expiry_date: input.expiry_date,
        from_admin: false,
        virtual_event: input.virtual_event,
        private_event: true,
        channel: 'test_channel',
        platform: 'test_platform',
        location_type: 'test_location_type',
        timezone: 'UTC',
        created_date: '2023-01-01T00:00:00.000Z',
      };

      mock.onPut(`${baseUrl}/events`).reply(200, mockResponse);

      const result = await api.updateDrop(input);
      expect(result).toEqual(mockResponse);
    });
  });
});
