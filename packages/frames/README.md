# @poap-xyz/frames

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

`@poap-xyz/frames` is a package to help with the development of Farcaster Frames.

## Features

- Generate the frame meta tags
- Generate the frame HTML markup

## Installation

### NPM

```bash
npm install @poap-xyz/frames
```

### Yarn

```bash
yarn add @poap-xyz/frames
```

## Usage

### Meta tags

```javascript
const frame = useMemo(() => new Frame({ ... });
return (
  <>
    <NextSeo
      title="Hello World"
      description="..."
      openGraph={{ images: [...] }}
      additionalMetaTags={frame.toMetaTags()}
    />
    <div>...</div>
  </>
)
```

### HTML render

```typescript
// /api/frame.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const frame = new Frame({ ... });
  return res.status(200).send(frame.render());
}
```

## Documentation

For more detailed documentation, please visit:

- [`@poap-xyz/frames` documentation](https://sdk.poap.tech/packages/frames)
- [POAP documentation](https://documentation.poap.tech/docs)

## Contributing

We welcome contributions! Please see the [`CONTRIBUTING.md`](../../.github/CONTRIBUTING.md) file for
guidelines on how to get involved.

## License

`@poap-xyz/frames` is released under the [MIT License](https://opensource.org/licenses/MIT).
