[poap.js](../README.md) / [Modules](../modules.md) / [providers/src](../modules/providers_src.md) / PoapCompass

# Class: PoapCompass

[providers/src](../modules/providers_src.md).PoapCompass

A class that implements the `CompassProvider` interface for fetching data from the Poap API.

**`Implements`**

## Implements

- [`CompassProvider`](../interfaces/providers_src.CompassProvider.md)

## Table of contents

### Constructors

- [constructor](providers_src.PoapCompass.md#constructor)

### Properties

- [HttpProvider](providers_src.PoapCompass.md#httpprovider)
- [apiKey](providers_src.PoapCompass.md#apikey)

### Methods

- [fetchGraphQL](providers_src.PoapCompass.md#fetchgraphql)
- [request](providers_src.PoapCompass.md#request)

## Constructors

### constructor

• **new PoapCompass**(`apiKey`, `HttpProvider`)

Creates a new instance of the `PoapCompass` class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey` | `string` | The API key to use for requests. |
| `HttpProvider` | [`HttpProvider`](../interfaces/providers_src.HttpProvider.md) | An instance of the `HttpProvider` class for making HTTP requests. |

#### Defined in

[providers/src/core/PoapCompass/PoapCompass.ts:21](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/core/PoapCompass/PoapCompass.ts#L21)

## Properties

### HttpProvider

• `Private` **HttpProvider**: [`HttpProvider`](../interfaces/providers_src.HttpProvider.md)

An instance of the `HttpProvider` class for making HTTP requests.

#### Defined in

[providers/src/core/PoapCompass/PoapCompass.ts:21](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/core/PoapCompass/PoapCompass.ts#L21)

___

### apiKey

• `Private` **apiKey**: `string`

The API key to use for requests.

#### Defined in

[providers/src/core/PoapCompass/PoapCompass.ts:21](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/core/PoapCompass/PoapCompass.ts#L21)

## Methods

### fetchGraphQL

▸ `Private` **fetchGraphQL**<`R`\>(`query`, `variables`): `Promise`<`R`\>

Fetches data from the Poap GraphQL API.

**`Async`**

**`Function`**

**`Name`**

PoapCompass#fetchGraphQL

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `R` | `any` | The type of the result. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `string` | The GraphQL query to fetch. |
| `variables` | `Record`<`string`, `any`\> | The variables to include with the query. |

#### Returns

`Promise`<`R`\>

A Promise that resolves with the result of the query.

#### Defined in

[providers/src/core/PoapCompass/PoapCompass.ts:35](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/core/PoapCompass/PoapCompass.ts#L35)

___

### request

▸ **request**<`T`\>(`query`, `variables`): `Promise`<`T`\>

Executes a GraphQL query using the `fetchGraphQL` method.

**`Async`**

**`Function`**

**`Name`**

PoapCompass#request

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the result. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `string` | The GraphQL query to execute. |
| `variables` | `any` | The variables to include with the query. |

#### Returns

`Promise`<`T`\>

A Promise that resolves with the result of the query.

#### Implementation of

[CompassProvider](../interfaces/providers_src.CompassProvider.md).[request](../interfaces/providers_src.CompassProvider.md#request)

#### Defined in

[providers/src/core/PoapCompass/PoapCompass.ts:84](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/core/PoapCompass/PoapCompass.ts#L84)
