# @poap-xyz/poap-sdk

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

`@poap-xyz/poap-sdk` is a package to interact with everything POAP.

## Features

### POAPs

- Fetch one or multiple POAP tokens at once.
- Search for minted POAPs by their collector or the drop they belong to.
- Mint POAPs using synchronous or asynchronous processes.
- Reserve a POAP to an email address.
- Obtain mint status, POAP indexed status, and more.

### Drops 

- Create a Drop
- Update a Drop attributes
- Fetch a single Drop
- Fetch multiple Drops
- Search Drops

### Moments

- Create a Moment attached to a Drop or a specific POAP
- Fetch multiple Moments
- Fetch a single Moment

### Profiles

- Fetch a Profile by ETH address or ENS. Get back info like ENS, avatar, and header.
- Fetch multiple Profiles in bulk

### Providers

- Interfaces to interact with POAP APIs
- POAP custom Providers so you can use without implementing one.

### Utils

- PaginatedResult: A paginated interface that makes it easier to manage paginated results
- SecureFetch: A wrapper for headers that inserts the authentication with POAP.

## Installation

### NPM

```bash
npm install @poap-xyz/poap-sdk
```

### Yarn

```bash
yarn add @poap-xyz/poap-sdk
```

## Documentation

For more detailed documentation, please visit:

- [`@poap-xyz/poap-sdk` documentation](https://sdk.poap.tech/packages/poap-sdk)
- [POAP documentation](https://documentation.poap.tech/docs)

## Contributing

We welcome contributions! Please see the [`CONTRIBUTING.md`](../../.github/CONTRIBUTING.md) file for
guidelines on how to get involved.

## License

`@poap-xyz/poap-sdk` is released under the [MIT License](https://opensource.org/licenses/MIT).
