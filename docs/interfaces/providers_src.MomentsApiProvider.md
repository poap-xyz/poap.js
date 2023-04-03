[poap.js](../README.md) / [Modules](../modules.md) / [providers/src](../modules/providers_src.md) / MomentsApiProvider

# Interface: MomentsApiProvider

[providers/src](../modules/providers_src.md).MomentsApiProvider

Provides methods for interacting with a moments API.

**`Interface`**

MomentsApiProvider

## Implemented by

- [`PoapMomentsApi`](../classes/providers_src.PoapMomentsApi.md)

## Table of contents

### Methods

- [createMoment](providers_src.MomentsApiProvider.md#createmoment)
- [getFileUrl](providers_src.MomentsApiProvider.md#getfileurl)

## Methods

### createMoment

▸ **createMoment**(`input`): `Promise`<`CreateMomentResponse`\>

Creates a new moment on the API.

**`Async`**

**`Function`**

**`Name`**

MomentsApiProvider#createMoment

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `CreateMomentInput` | The input data for creating the moment. |

#### Returns

`Promise`<`CreateMomentResponse`\>

A Promise that resolves with the response from the API.

#### Defined in

[providers/src/ports/MomentsApiProvider/MomentsApiProvider.ts:28](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/ports/MomentsApiProvider/MomentsApiProvider.ts#L28)

___

### getFileUrl

▸ **getFileUrl**(): `Promise`<`string`\>

Retrieves the file URL for uploading a moment to the API.

**`Async`**

**`Function`**

**`Name`**

MomentsApiProvider#getFileUrl

#### Returns

`Promise`<`string`\>

A Promise that resolves with the file URL from the API.

#### Defined in

[providers/src/ports/MomentsApiProvider/MomentsApiProvider.ts:17](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/ports/MomentsApiProvider/MomentsApiProvider.ts#L17)
