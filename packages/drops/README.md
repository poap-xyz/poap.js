# @poap-xyz/drops

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

`@poap-xyz/drops` is a package to interact with POAP Drops.

## Features

- Create a Drop
- Update a Drop attributes
- Fetch a single Drop
- Fetch multiple Drops
- Search Drops

## Installation

### NPM

```bash
npm install @poap-xyz/drops @poap-xyz/utils @poap-xyz/providers axios
```

### Yarn

```bash
yarn add @poap-xyz/drops @poap-xyz/utils @poap-xyz/providers axios
```

## Usage

```javascript
  import { DropsClient } from '@poap-xyz/drops';
  import { PoapCompass, PoapDropApi } from '@poap-xyz/providers';

  const client = new DropsClient(
    new PoapCompass('your_api_key'),
    new PoapDropApi('your_api_key'),
  );
```

## Documentation

For more detailed documentation, please visit:

- [`@poap-xyz/drops` documentation](https://sdk.poap.tech/packages/drops)
- [POAP documentation](https://documentation.poap.tech/docs)

## Contributing

We welcome contributions! Please see the [`CONTRIBUTING.md`](../../.github/CONTRIBUTING.md) file for
guidelines on how to get involved.

## License

`@poap-xyz/drops` is released under the [MIT License](https://opensource.org/licenses/MIT).
