# POAP Attributes

Package to interact with POAP Attributes

## Installation

```bash
npm install @poap-xyz/attributes
```

## Usage

```javascript
import { AttributesClient, FetchAttributesInput } from '@poap-xyz/attributes';
import { RegistryApiProvider, CompassProvider } from '@poap-xyz/providers';

const registryApiProvider = new RegistryApiProvider();
const compassProvider = new CompassProvider();
const attributesClient = new AttributesClient(registryApiProvider, compassProvider);

// Create a single attribute
const attribute = await attributesClient.create({
  // Input data for creating the attribute
});

// Create multiple attributes
const attributes = await attributesClient.createBulk({
  // Input data for creating the attributes
});

// Fetch a paginated list of attributes filtered by key and value, and sorted by order
const input: FetchAttributesInput = {
  limit: 10,
  offset: 0,
  order: 'asc',
  key: 'someKey',
  value: 'someValue',
};

const result = await attributesClient.fetch(input);
```

## API

### AttributesClient

A client for creating and fetching attributes.

#### `AttributesClient(RegistryApiProvider, CompassProvider)`

Creates a new AttributesClient instance.

##### Parameters

- `RegistryApiProvider` (required): The registry API provider to use for creating attributes.
- `CompassProvider` (required): The Compass provider to use for fetching attributes.

#### `create(input)`

Creates a single attribute.

##### Parameters

- `input` (required): The input data for creating the attribute.

##### Returns

A Promise that resolves with the created attribute.

#### `createBulk(input)`

Creates multiple attributes.

##### Parameters

- `input` (required): The input data for creating the attributes.

##### Returns

A Promise that resolves with an array of the created attributes.

#### `fetch(input)`

Fetches a paginated list of attributes filtered by key and value, and sorted by order.

##### Parameters

- `input` (required): An object containing the input parameters.
  - `limit` (required): The maximum number of attributes to retrieve per page.
  - `offset` (required): The offset to start retrieving attributes from.
  - `order` (required): The attribute order to use. Can be "asc" or "desc".
  - `key` (optional): The key to filter the attributes by.
  - `value` (optional): The value to filter the attributes by.

##### Returns

A promise that resolves to a paginated result of attributes.

### Attribute

A class representing an attribute.

#### `Attribute({id, dropId, key, value, timestamp, tokenId})`

Creates a new Attribute instance.

##### Parameters

- `id` (required): The attribute ID.
- `dropId` (optional): The drop ID associated with the attribute.
- `key` (required): The attribute key.
- `value` (required): The attribute value.
- `timestamp` (required): The timestamp of the attribute.
- `tokenId` (optional): The token ID associated with the attribute.

## License

[MIT](https://opensource.org/licenses/MIT)
