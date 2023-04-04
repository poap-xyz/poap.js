[poap.js](../README.md) / [Modules](../modules.md) / [providers/src](../modules/providers_src.md) / DropApiProvider

# Interface: DropApiProvider

[providers/src](../modules/providers_src.md).DropApiProvider

Provides methods for interacting with a drop API.

**`Interface`**

DropApiProvider

## Implemented by

- [`PoapDropApi`](../classes/providers_src.PoapDropApi.md)

## Table of contents

### Methods

- [createDrop](providers_src.DropApiProvider.md#createdrop)
- [updateDrop](providers_src.DropApiProvider.md#updatedrop)

## Methods

### createDrop

▸ **createDrop**(`input`): `Promise`<`DropResponse`\>

Creates a new drop.

**`Async`**

**`Function`**

**`Name`**

DropApiProvider#createDrop

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `CreateDropInput` | The input data for creating the drop. |

#### Returns

`Promise`<`DropResponse`\>

A Promise that resolves with the response from the API.

#### Defined in

[providers/src/ports/DropApiProvider/DropApiProvider.ts:18](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/ports/DropApiProvider/DropApiProvider.ts#L18)

___

### updateDrop

▸ **updateDrop**(`input`): `Promise`<`DropResponse`\>

Updates an existing drop.

**`Async`**

**`Function`**

**`Name`**

DropApiProvider#updateDrop

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `UpdateDropInput` | The input data for updating the drop. |

#### Returns

`Promise`<`DropResponse`\>

A Promise that resolves with the response from the API.

#### Defined in

[providers/src/ports/DropApiProvider/DropApiProvider.ts:29](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/ports/DropApiProvider/DropApiProvider.ts#L29)
