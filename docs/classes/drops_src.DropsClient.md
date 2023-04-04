[poap.js](../README.md) / [Modules](../modules.md) / [drops/src](../modules/drops_src.md) / DropsClient

# Class: DropsClient

[drops/src](../modules/drops_src.md).DropsClient

Represents a client for working with POAP drops.

## Table of contents

### Constructors

- [constructor](drops_src.DropsClient.md#constructor)

### Properties

- [CompassProvider](drops_src.DropsClient.md#compassprovider)
- [DropApiProvider](drops_src.DropsClient.md#dropapiprovider)

### Methods

- [create](drops_src.DropsClient.md#create)
- [fetch](drops_src.DropsClient.md#fetch)
- [update](drops_src.DropsClient.md#update)

## Constructors

### constructor

• **new DropsClient**(`CompassProvider`, `DropApiProvider`)

Creates a new DropsClient object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `CompassProvider` | [`CompassProvider`](../interfaces/providers_src.CompassProvider.md) | The provider for the POAP compass API. |
| `DropApiProvider` | [`DropApiProvider`](../interfaces/providers_src.DropApiProvider.md) | The provider for the POAP drop API. |

#### Defined in

[drops/src/DropsClient.ts:26](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/drops/src/DropsClient.ts#L26)

## Properties

### CompassProvider

• `Private` **CompassProvider**: [`CompassProvider`](../interfaces/providers_src.CompassProvider.md)

The provider for the POAP compass API.

#### Defined in

[drops/src/DropsClient.ts:27](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/drops/src/DropsClient.ts#L27)

___

### DropApiProvider

• `Private` **DropApiProvider**: [`DropApiProvider`](../interfaces/providers_src.DropApiProvider.md)

The provider for the POAP drop API.

#### Defined in

[drops/src/DropsClient.ts:28](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/drops/src/DropsClient.ts#L28)

## Methods

### create

▸ **create**(`input`): `Promise`<`Drop`\>

Creates a new drop.

**`Async`**

**`Method`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `CreateDropsInput` | The input for creating a new drop. |

#### Returns

`Promise`<`Drop`\>

The newly created drop.

#### Defined in

[drops/src/DropsClient.ts:96](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/drops/src/DropsClient.ts#L96)

___

### fetch

▸ **fetch**(`input`): `Promise`<`PaginatedResult`<`Drop`\>\>

Fetches drops based on the specified input.

**`Async`**

**`Method`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `FetchDropsInput` | The input for fetching drops. |

#### Returns

`Promise`<`PaginatedResult`<`Drop`\>\>

A paginated result of drops.

#### Defined in

[drops/src/DropsClient.ts:39](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/drops/src/DropsClient.ts#L39)

___

### update

▸ **update**(`input`): `Promise`<`Drop`\>

Updates an existing drop.

**`Async`**

**`Method`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `CreateDropsInput` | The input for updating an existing drop. |

#### Returns

`Promise`<`Drop`\>

The updated drop.

#### Defined in

[drops/src/DropsClient.ts:109](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/drops/src/DropsClient.ts#L109)
