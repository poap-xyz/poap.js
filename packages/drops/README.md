# @poap-xyz/drops

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

@poap-xyz/drops is a package to interact with POAP Drops.

## Features

- Create a Drop
- Update a Drop
- Fetch a Drop
- Fetch multiple Drops

## Installation

### NPM

```bash
npm install @poap-xyz/drops @poap-xyz/utils @poap-xyz/providers axios form-data
```

### Yarn

```bash
yarn add @poap-xyz/drops @poap-xyz/utils @poap-xyz/providers axios form-data
```

## Usage

```javascript
  import { DropsClient } from '@poap-xyz/drops';
  import { PoapCompass, PoapDropApi } from '@poap-xyz/providers';

  const client = new DropsClient(
    new PoapCompass('you_api_key'),
    new PoapDropApi('your_api_key'),
  );
```

## Documentation

For more detailed documentation, please visit [this link](https://documentation.poap.tech/docs).

## Examples

For example scripts and usage, please check the [examples](https://github.com/poap-xyz/poap.js/tree/main/examples).

## Contributing

We welcome contributions! Please see the `CONTRIBUTING.md` file for guidelines.

## License

@poap-xyz/drops is released under the [MIT License](https://opensource.org/licenses/MIT).
