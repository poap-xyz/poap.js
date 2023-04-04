[poap.js](../README.md) / [Modules](../modules.md) / [providers/src](../modules/providers_src.md) / PoapRegistryApi

# Class: PoapRegistryApi

[providers/src](../modules/providers_src.md).PoapRegistryApi

Creates a new instance of the `PoapRegistryApi` class.

**`Param`**

The API key to use for requests.

**`Param`**

An instance of the `HttpProvider` class for making HTTP requests.

## Implements

- [`RegistryApiProvider`](../interfaces/providers_src.RegistryApiProvider.md)

## Table of contents

### Constructors

- [constructor](providers_src.PoapRegistryApi.md#constructor)

### Properties

- [HttpProvider](providers_src.PoapRegistryApi.md#httpprovider)
- [apiKey](providers_src.PoapRegistryApi.md#apikey)

### Methods

- [createAttribute](providers_src.PoapRegistryApi.md#createattribute)
- [createAttributesBulk](providers_src.PoapRegistryApi.md#createattributesbulk)
- [secureFetch](providers_src.PoapRegistryApi.md#securefetch)

## Constructors

### constructor

• **new PoapRegistryApi**(`apiKey`, `HttpProvider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiKey` | `string` |
| `HttpProvider` | [`HttpProvider`](../interfaces/providers_src.HttpProvider.md) |

#### Defined in

[providers/src/core/PoapRegistryApi/PoapRegistryApi.ts:22](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/core/PoapRegistryApi/PoapRegistryApi.ts#L22)

## Properties

### HttpProvider

• `Private` **HttpProvider**: [`HttpProvider`](../interfaces/providers_src.HttpProvider.md)

#### Defined in

[providers/src/core/PoapRegistryApi/PoapRegistryApi.ts:22](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/core/PoapRegistryApi/PoapRegistryApi.ts#L22)

___

### apiKey

• `Private` **apiKey**: `string`

#### Defined in

[providers/src/core/PoapRegistryApi/PoapRegistryApi.ts:22](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/core/PoapRegistryApi/PoapRegistryApi.ts#L22)

## Methods

### createAttribute

▸ **createAttribute**(`input`): `Promise`<`AttributeResponse`\>

Creates a new attribute on the Poap Registry API.

**`Async`**

**`Function`**

**`Name`**

PoapRegistryApi#createAttribute

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`CreateAttributeInput`](../modules/providers_src.md#createattributeinput) | The input data for creating the attribute. |

#### Returns

`Promise`<`AttributeResponse`\>

A Promise that resolves with the response from the API.

#### Implementation of

[RegistryApiProvider](../interfaces/providers_src.RegistryApiProvider.md).[createAttribute](../interfaces/providers_src.RegistryApiProvider.md#createattribute)

#### Defined in

[providers/src/core/PoapRegistryApi/PoapRegistryApi.ts:33](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/core/PoapRegistryApi/PoapRegistryApi.ts#L33)

___

### createAttributesBulk

▸ **createAttributesBulk**(`input`): `Promise`<`CreateAttributesBulkResponse`\>

Creates multiple attributes at once on the Poap Registry API.

**`Async`**

**`Function`**

**`Name`**

PoapRegistryApi#createAttributesBulk

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`CreateAttributesBulkInput`](../modules/providers_src.md#createattributesbulkinput) | The input data for creating the attributes. |

#### Returns

`Promise`<`CreateAttributesBulkResponse`\>

A Promise that resolves with the response from the API.

#### Implementation of

[RegistryApiProvider](../interfaces/providers_src.RegistryApiProvider.md).[createAttributesBulk](../interfaces/providers_src.RegistryApiProvider.md#createattributesbulk)

#### Defined in

[providers/src/core/PoapRegistryApi/PoapRegistryApi.ts:52](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/core/PoapRegistryApi/PoapRegistryApi.ts#L52)

___

### secureFetch

▸ `Private` **secureFetch**(`url`, `options`): `Promise`<`any`\>

Sends a secure HTTP request to the Poap Registry API.

**`Async`**

**`Function`**

**`Name`**

PoapRegistryApi#secureFetch

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL for the HTTP request. |
| `options` | `any` | The options for the HTTP request. |

#### Returns

`Promise`<`any`\>

A Promise that resolves with the response from the API.

#### Defined in

[providers/src/core/PoapRegistryApi/PoapRegistryApi.ts:73](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/core/PoapRegistryApi/PoapRegistryApi.ts#L73)
