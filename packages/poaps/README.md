# @poap-xyz/poaps

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

`@poap-xyz/poaps` is a JavaScript library providing an interface for interacting with POAPs, making
it easy to fetch information about POAP tokens like their on-chain data, their related drop
information and metadata.

## Features

- Fetch one or multiple POAP tokens at once.
- Search over minted POAPs by their collector or the drop they belong to.
- Mint POAPs synchronously or asynchronously mint processes.
- Reserve a POAP to an email address.
- Obtain mint status, POAP indexed status, and more.

## Installation

This package doesn't require any additional dependencies for installation.

### NPM

```bash
npm install @poap-xyz/poaps
```

### Yarn

```bash
yarn add @poap-xyz/poaps
```

## Usage

```javascript
import { PoapsClient } from '@poap-xyz/poaps';
import {
  AuthenticationProviderHttp,
  PoapCompass,
  PoapTokenApi,
} from '@poap-xyz/providers';

// Create a new instance of PoapsClient
const client = new PoapsClient(
  new PoapCompass({
    apiKey: 'YOUR_COMPASS_API_KEY',
  }),
  new PoapTokenApi({
    apiKey: 'YOUR_POAP_TOKEN_API_KEY',
    authenticationProvider: new AuthenticationProviderHttp(
      'YOUR_CLIENT_ID',
      'YOUR_CLIENT_SECRET',
    ),
  }),
);
```

## Documentation

For more detailed documentation, please visit:

- [`@poap-xyz/poaps` documentation](https://sdk.poap.tech/packages/poaps)
- [POAP documentation](https://documentation.poap.tech/docs)

## Contributing

We welcome contributions! Please see the [`CONTRIBUTING.md`](../../.github/CONTRIBUTING.md) file for
guidelines on how to get involved.

## License

`@poap-xyz/poaps` is released under the [MIT License](https://opensource.org/licenses/MIT).
