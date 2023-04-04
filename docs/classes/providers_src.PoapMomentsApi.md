[poap.js](../README.md) / [Modules](../modules.md) / [providers/src](../modules/providers_src.md) / PoapMomentsApi

# Class: PoapMomentsApi

[providers/src](../modules/providers_src.md).PoapMomentsApi

Provides methods for interacting with a moments API.

**`Interface`**

MomentsApiProvider

## Implements

- [`MomentsApiProvider`](../interfaces/providers_src.MomentsApiProvider.md)

## Table of contents

### Constructors

- [constructor](providers_src.PoapMomentsApi.md#constructor)

### Properties

- [HttpProvider](providers_src.PoapMomentsApi.md#httpprovider)
- [apiKey](providers_src.PoapMomentsApi.md#apikey)

### Methods

- [createMoment](providers_src.PoapMomentsApi.md#createmoment)
- [getFileUrl](providers_src.PoapMomentsApi.md#getfileurl)
- [secureFetch](providers_src.PoapMomentsApi.md#securefetch)

## Constructors

### constructor

• **new PoapMomentsApi**(`apiKey`, `HttpProvider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiKey` | `string` |
| `HttpProvider` | [`HttpProvider`](../interfaces/providers_src.HttpProvider.md) |

#### Defined in

providers/src/core/PoapMomentsApi/PoapMomentsApi.ts:11

## Properties

### HttpProvider

• `Private` **HttpProvider**: [`HttpProvider`](../interfaces/providers_src.HttpProvider.md)

#### Defined in

providers/src/core/PoapMomentsApi/PoapMomentsApi.ts:11

___

### apiKey

• `Private` **apiKey**: `string`

#### Defined in

providers/src/core/PoapMomentsApi/PoapMomentsApi.ts:11

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

#### Implementation of

[MomentsApiProvider](../interfaces/providers_src.MomentsApiProvider.md).[createMoment](../interfaces/providers_src.MomentsApiProvider.md#createmoment)

#### Defined in

providers/src/core/PoapMomentsApi/PoapMomentsApi.ts:21

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

#### Implementation of

[MomentsApiProvider](../interfaces/providers_src.MomentsApiProvider.md).[getFileUrl](../interfaces/providers_src.MomentsApiProvider.md#getfileurl)

#### Defined in

providers/src/core/PoapMomentsApi/PoapMomentsApi.ts:13

___

### secureFetch

▸ **secureFetch**(`url`, `options`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

providers/src/core/PoapMomentsApi/PoapMomentsApi.ts:29
