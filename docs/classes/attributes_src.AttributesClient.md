[poap.js](../README.md) / [Modules](../modules.md) / [attributes/src](../modules/attributes_src.md) / AttributesClient

# Class: AttributesClient

[attributes/src](../modules/attributes_src.md).AttributesClient

A client for creating attributes.

## Table of contents

### Constructors

- [constructor](attributes_src.AttributesClient.md#constructor)

### Properties

- [CompassProvider](attributes_src.AttributesClient.md#compassprovider)
- [RegistryApiProvider](attributes_src.AttributesClient.md#registryapiprovider)

### Methods

- [create](attributes_src.AttributesClient.md#create)
- [createBulk](attributes_src.AttributesClient.md#createbulk)
- [fetch](attributes_src.AttributesClient.md#fetch)

## Constructors

### constructor

• **new AttributesClient**(`RegistryApiProvider`, `CompassProvider`)

Creates a new AttributesClient.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `RegistryApiProvider` | [`RegistryApiProvider`](../interfaces/providers_src.RegistryApiProvider.md) | The registry API provider to use for creating attributes. |
| `CompassProvider` | [`CompassProvider`](../interfaces/providers_src.CompassProvider.md) | - |

#### Defined in

[attributes/src/AttributesClient.ts:20](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/attributes/src/AttributesClient.ts#L20)

## Properties

### CompassProvider

• `Private` **CompassProvider**: [`CompassProvider`](../interfaces/providers_src.CompassProvider.md)

#### Defined in

[attributes/src/AttributesClient.ts:20](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/attributes/src/AttributesClient.ts#L20)

___

### RegistryApiProvider

• `Private` **RegistryApiProvider**: [`RegistryApiProvider`](../interfaces/providers_src.RegistryApiProvider.md)

The registry API provider to use for creating attributes.

#### Defined in

[attributes/src/AttributesClient.ts:20](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/attributes/src/AttributesClient.ts#L20)

## Methods

### create

▸ **create**(`input`): `Promise`<`Attribute`\>

Creates a single attribute.

**`Async`**

**`Function`**

**`Name`**

AttributesClient#create

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`CreateAttributeInput`](../modules/providers_src.md#createattributeinput) | The input data for creating the attribute. |

#### Returns

`Promise`<`Attribute`\>

A Promise that resolves with the created attribute.

#### Defined in

[attributes/src/AttributesClient.ts:31](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/attributes/src/AttributesClient.ts#L31)

___

### createBulk

▸ **createBulk**(`input`): `Promise`<`Attribute`[]\>

Creates multiple attributes.

**`Async`**

**`Function`**

**`Name`**

AttributesClient#createBulk

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`CreateAttributesBulkInput`](../modules/providers_src.md#createattributesbulkinput) | The input data for creating the attributes. |

#### Returns

`Promise`<`Attribute`[]\>

A Promise that resolves with an array of the created attributes.

#### Defined in

[attributes/src/AttributesClient.ts:48](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/attributes/src/AttributesClient.ts#L48)

___

### fetch

▸ **fetch**(`input`): `Promise`<`PaginatedResult`<`Attribute`\>\>

Fetches a paginated list of attributes filtered by `key` and `value` and sorted by `order`.

**`Async`**

**`Function`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `FetchAttributesInput` | An object containing the input parameters. |

#### Returns

`Promise`<`PaginatedResult`<`Attribute`\>\>

- A promise that resolves to a paginated result of attributes.

#### Defined in

[attributes/src/AttributesClient.ts:71](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/attributes/src/AttributesClient.ts#L71)
