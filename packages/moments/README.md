# @poap-xyz/moments

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

@poap-xyz/moments is a package to interact with POAP Moments.

## Features

- Create a Moment
- Fetch multiple Moments
- Fetch a single Moment

## Installation

### NPM

```bash
npm install @poap-xyz/moments @poap-xyz/utils @poap-xyz/providers axios form-data
```

### Yarn

```bash
yarn add @poap-xyz/moments @poap-xyz/utils @poap-xyz/providers axios form-data
```

## Usage

```javascript
import { MomentsClient, createMomentInput, Moment } from '@poap-xyz/moments';
import { PoapCompass, PoapMomentsApi } from '@poap-xyz/providers';
import fs from 'fs';

const client = new MomentsClient(
  new PoapMomentsApi('your_api_key'),
  new PoapCompass('your_api_key'),
);

const input: createMomentInput = {
  dropId: 110148,
  /**
    * The Token ID related to the moment (Optional)
    */
  tokenId: 6568008,
  file: await fs.promises.readFile('src/assets/poap.png'),
  author: '0x82AB2941Cf555CED5ad7Ed232a5B5f6083815FBC',
  mimeType: 'image/png',
};
const response: Moment = await client.createMoment(input);
```

## Documentation

For more detailed documentation, please visit [this link](https://documentation.poap.tech/docs).

## Examples

For example scripts and usage, please check the [examples](https://github.com/poap-xyz/poap.js/tree/main/examples).

## Contributing

We welcome contributions! Please see the `CONTRIBUTING.md` file for guidelines.

## License

@poap-xyz/moments is released under the [MIT License](https://opensource.org/licenses/MIT).
