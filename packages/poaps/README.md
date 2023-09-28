# @poap-xyz/poaps

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

`@poap-xyz/poaps` is a JavaScript library providing an interface for interacting with POAPs (Proof of Attendance Protocol tokens), allowing you to fetch information about POAP tokens, their on-chain data, their related drop and metadata, all in a simplified manner.

## Features

- Fetch single or multiple POAP tokens.
- Search over minted POAPs by their collector or the drop they belong to.
- Manage asynchronous and synchronous mint processes.
- Reserve POAP against an email address.
- Obtain mint status, POAP indexed status, and more.

## Installation

This package doesn't require any additional dependencies for installation.

### NPM

\`\`\`bash
npm install @poap-xyz/poaps
\`\`\`

### Yarn

\`\`\`bash
yarn add @poap-xyz/poaps
\`\`\`

## Usage

\`\`\`javascript
import { PoapsClient } from '@poap-xyz/poaps';
import {
  AuthenticationProviderHttp,
  PoapCompass,
  PoapTokenApi,
} from '@poap-xyz/providers';

// Create a new instance of PoapsClient
const client = new PoapsClient(
  new PoapCompass({
    apiKey: 'YOUR_API_KEY',
  }),
  new PoapTokenApi({
    apiKey: 'YOUR_API_KEY',
    baseUrl: 'POAP_TOKEN_BASE_URL',
    authenticationProvider: new AuthenticationProviderHttp(
      'YOUR_CLIENT_ID',
      'YOUR_CLIENT_SECRET',
      'YOUR_OAUTH_SERVER_DOMAIN',
    ),
  }),
);
\`\`\`

## Documentation

Detailed documentation for each class, method, and type exported by this package can be found in the [PoapsClient Documentation](#poapsclient-documentation-section).

## Examples

For example scripts and usage, please check the [examples](https://github.com/poap-xyz/poap.js/tree/main/examples) directory in the GitHub repository.

## Contributing

We welcome contributions! Please see the \`CONTRIBUTING.md\` file for guidelines on how to get involved.

## License

@poap-xyz/poaps is released under the [MIT License](https://opensource.org/licenses/MIT).

## Exports

- [\`PoapsClient\`](https://github.com/poap-xyz/poap.js/tree/main/packages/poaps/docs/PoapsClient.md)
- [\`POAP\`](https://github.com/poap-xyz/poap.js/tree/main/packages/poaps/docs/POAP.md)
- [\`POAPReservation\`](https://github.com/poap-xyz/poap.js/tree/main/packages/poaps/docs/POAPReservation.md)
- [\`FetchPoapsInput\`](https://github.com/poap-xyz/poap.js/tree/main/packages/poaps/docs/inputs.md/FetchPoapsInput)
- [\`PoapMintStatus\`](https://github.com/poap-xyz/poap.js/tree/main/packages/poaps/docs/responses.md/PoapMintStatus)
- [\`PoapsSortFields\`](https://github.com/poap-xyz/poap.js/tree/main/packages/poaps/docs/inputs.md/PoapsSortFields)
- [\`CodeAlreadyMintedError\`](https://github.com/poap-xyz/poap.js/tree/main/packages/poaps/docs/errors.md/CodeAlreadyMintedError)
- [\`CodeExpiredError\`](https://github.com/poap-xyz/poap.js/tree/main/packages/poaps/docs/errors.md/CodeExpiredError)
- [\`FinishedWithError\`](https://github.com/poap-xyz/poap.js/tree/main/packages/poaps/docs/errors.md/FinishedWithError)

## PoapsClient Documentation Section

(Refer to the documentation created earlier for detailed information on \`PoapsClient\`)
