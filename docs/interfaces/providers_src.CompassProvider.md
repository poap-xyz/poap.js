[poap.js](../README.md) / [Modules](../modules.md) / [providers/src](../modules/providers_src.md) / CompassProvider

# Interface: CompassProvider

[providers/src](../modules/providers_src.md).CompassProvider

Provides a request method for executing GraphQL queries.

**`Interface`**

CompassProvider

## Implemented by

- [`PoapCompass`](../classes/providers_src.PoapCompass.md)

## Table of contents

### Methods

- [request](providers_src.CompassProvider.md#request)

## Methods

### request

▸ **request**<`T`\>(`query`, `variables`): `Promise`<`T`\>

Executes a GraphQL query with the provided query string and variables.

**`Function`**

**`Name`**

CompassProvider#request

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the result. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `string` | The query string to execute. |
| `variables` | `Record`<`string`, `any`\> | The variables to pass with the query. |

#### Returns

`Promise`<`T`\>

A Promise that resolves with the result of the query.

#### Defined in

[providers/src/ports/CompassProvider/CompassProvider.ts:19](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/ports/CompassProvider/CompassProvider.ts#L19)
