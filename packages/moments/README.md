# @poap-xyz/moments

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

`@poap-xyz/moments` is a package to interact with POAP Moments.

## Features

- Create a Moment attached to a Drop or an specific POAP
- Fetch multiple Moments
- Fetch a single Moment

## Installation

### NPM

```bash
npm install @poap-xyz/moments @poap-xyz/utils @poap-xyz/providers axios
```

### Yarn

```bash
yarn add @poap-xyz/moments @poap-xyz/utils @poap-xyz/providers axio
```

## Usage

```typescript
import {MomentsClient, CreateMomentInput, Moment} from '@poap-xyz/moments';
import {PoapCompass, PoapMomentsApi, AuthenticationProviderHttp} from '@poap-xyz/providers';
import fs from 'fs';

// Set up the PoapMomentsApi with proper authentication
const momentsApi = new PoapMomentsApi({
    authenticationProvider: new AuthenticationProviderHttp(
        'CLIENT_ID',
        'CLIENT_SECRET',
    ),
});

const client = new MomentsClient(
    momentsApi,
    new PoapCompass('your_api_key_for_compass'),
);

const input: CreateMomentInput = {
    dropIds: [110148],
    media: [{
        fileBinary: await fs.promises.readFile('src/assets/poap.png'),
        fileType: 'image/png',
    }],
    author: '0x82AB2941Cf555CED5ad7Ed232a5B5f6083815FBC',
    description: 'Your moment description here', // Optional description for the moment
    onStepUpdate: (step) => {
        console.log(step); // Monitor the step-by-step process of creating a moment
    },
    onFileUploadProgress: (progress) => {
        console.log(progress); // Monitor file upload progress
    },
    timeOut: 5000, // Optional: Set a timeout for the media processing
};
const moment: Moment = await client.createMomentAndUploadMedia(input);
```

Explanations for each step:

| Step Name                | Explanation                                              |
|--------------------------|----------------------------------------------------------|
| `UPLOADING_MEDIA`        | The process of uploading media assets.                   |
| `PROCESSING_MEDIA`       | The media assets are being processed after upload.       |
| `PROCESSING_MEDIA_ERROR` | An error occurred during the media processing phase.     |
| `UPLOADING_MOMENT`       | The process of uploading the moment's data.              |
| `FINISHED`               | The entire operation of creating the moment is complete. |

## Documentation

For more detailed documentation, please visit:

- [`@poap-xyz/moments` documentation](https://sdk.poap.tech/packages/moments)
- [POAP documentation](https://documentation.poap.tech/docs)

## Contributing

We welcome contributions! Please see the [`CONTRIBUTING.md`](../../.github/CONTRIBUTING.md) file for
guidelines on how to get involved.

## License

`@poap-xyz/moments` is released under the [MIT License](https://opensource.org/licenses/MIT).
