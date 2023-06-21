# @poap-xyz/poaps

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

`@poap-xyz/poaps` is a package to fetch information about POAPs tokens, their on-chain data, their related drop and metadata.

## Features

- Fetch a single POAP token,
- Search over minted POAPs by their collector or the drop they belong.

## Installation

### NPM

```bash
npm install @poap-xyz/poaps @poap-xyz/utils @poap-xyz/providers axios form-data
```

### Yarn

```bash
yarn add @poap-xyz/poaps @poap-xyz/utils @poap-xyz/providers axios form-data
```

## Usage

```javascript
  import { PoapsClient } from '@poap-xyz/poaps';
  import { PoapCompass } from '@poap-xyz/providers';

  const client = new PoapsClient(new PoapCompass('you_api_key'));

```

## Documentation

For more detailed documentation, please visit [this link](https://documentation.poap.tech/docs).

## Examples

For example scripts and usage, please check the [examples](https://github.com/poap-xyz/poap.js/tree/main/examples).

## Contributing

We welcome contributions! Please see the `CONTRIBUTING.md` file for guidelines.

## License

@poap-xyz/drops is released under the [MIT License](https://opensource.org/licenses/MIT).
