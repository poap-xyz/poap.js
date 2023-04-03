[poap.js](../README.md) / [Modules](../modules.md) / [providers/src](../modules/providers_src.md) / PoapDropApi

# Class: PoapDropApi

[providers/src](../modules/providers_src.md).PoapDropApi

A class that implements the `DropApiProvider` interface for interacting with the Poap Drop API.

**`Implements`**

## Implements

- [`DropApiProvider`](../interfaces/providers_src.DropApiProvider.md)

## Table of contents

### Constructors

- [constructor](providers_src.PoapDropApi.md#constructor)

### Properties

- [HttpProvider](providers_src.PoapDropApi.md#httpprovider)
- [apiKey](providers_src.PoapDropApi.md#apikey)
- [baseUrl](providers_src.PoapDropApi.md#baseurl)

### Methods

- [createDrop](providers_src.PoapDropApi.md#createdrop)
- [secureFetch](providers_src.PoapDropApi.md#securefetch)
- [updateDrop](providers_src.PoapDropApi.md#updatedrop)

## Constructors

### constructor

• **new PoapDropApi**(`apiKey`, `HttpProvider`)

Creates a new instance of the `PoapDropApi` class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey` | `string` | The API key to use for requests. |
| `HttpProvider` | [`HttpProvider`](../interfaces/providers_src.HttpProvider.md) | An instance of the `HttpProvider` class for making HTTP requests. |

#### Defined in

[providers/src/core/PoapDropApi/PoapDropApi.ts:27](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/core/PoapDropApi/PoapDropApi.ts#L27)

## Properties

### HttpProvider

• `Private` **HttpProvider**: [`HttpProvider`](../interfaces/providers_src.HttpProvider.md)

An instance of the `HttpProvider` class for making HTTP requests.

#### Defined in

[providers/src/core/PoapDropApi/PoapDropApi.ts:27](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/core/PoapDropApi/PoapDropApi.ts#L27)

___

### apiKey

• `Private` **apiKey**: `string`

The API key to use for requests.

#### Defined in

[providers/src/core/PoapDropApi/PoapDropApi.ts:27](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/core/PoapDropApi/PoapDropApi.ts#L27)

___

### baseUrl

• `Private` **baseUrl**: `string` = `'https://api.poap.tech'`

#### Defined in

[providers/src/core/PoapDropApi/PoapDropApi.ts:18](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/core/PoapDropApi/PoapDropApi.ts#L18)

## Methods

### createDrop

▸ **createDrop**(`input`): `Promise`<`DropResponse`\>

Creates a new drop on the Poap Drop API.

**`Async`**

**`Function`**

**`Name`**

PoapDropApi#createDrop

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `CreateDropInput` | The input data for creating the drop. |

#### Returns

`Promise`<`DropResponse`\>

A Promise that resolves with the response from the API.

#### Implementation of

[DropApiProvider](../interfaces/providers_src.DropApiProvider.md).[createDrop](../interfaces/providers_src.DropApiProvider.md#createdrop)

#### Defined in

[providers/src/core/PoapDropApi/PoapDropApi.ts:38](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/core/PoapDropApi/PoapDropApi.ts#L38)

___

### secureFetch

▸ `Private` **secureFetch**(`url`, `options`): `Promise`<`any`\>

Sends a secure HTTP request to the Poap Drop API.

**`Async`**

**`Function`**

**`Name`**

PoapDropApi#secureFetch

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL for the HTTP request. |
| `options` | `any` | The options for the HTTP request. |

#### Returns

`Promise`<`any`\>

A Promise that resolves with the response from the API.

#### Defined in

[providers/src/core/PoapDropApi/PoapDropApi.ts:75](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/core/PoapDropApi/PoapDropApi.ts#L75)

___

### updateDrop

▸ **updateDrop**(`input`): `Promise`<`DropResponse`\>

Updates an existing drop on the Poap Drop API.

**`Async`**

**`Function`**

**`Name`**

PoapDropApi#updateDrop

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `UpdateDropInput` | The input data for updating the drop. |

#### Returns

`Promise`<`DropResponse`\>

A Promise that resolves with the response from the API.

#### Implementation of

[DropApiProvider](../interfaces/providers_src.DropApiProvider.md).[updateDrop](../interfaces/providers_src.DropApiProvider.md#updatedrop)

#### Defined in

[providers/src/core/PoapDropApi/PoapDropApi.ts:55](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/core/PoapDropApi/PoapDropApi.ts#L55)
