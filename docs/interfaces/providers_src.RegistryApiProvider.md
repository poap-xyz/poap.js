[poap.js](../README.md) / [Modules](../modules.md) / [providers/src](../modules/providers_src.md) / RegistryApiProvider

# Interface: RegistryApiProvider

[providers/src](../modules/providers_src.md).RegistryApiProvider

Provides methods for interacting with a registry API.

**`Interface`**

RegistryApiProvider

## Implemented by

- [`PoapRegistryApi`](../classes/providers_src.PoapRegistryApi.md)

## Table of contents

### Methods

- [createAttribute](providers_src.RegistryApiProvider.md#createattribute)
- [createAttributesBulk](providers_src.RegistryApiProvider.md#createattributesbulk)

## Methods

### createAttribute

▸ **createAttribute**(`input`): `Promise`<`AttributeResponse`\>

Creates a single attribute on the API.

**`Async`**

**`Function`**

**`Name`**

RegistryApiProvider#createAttribute

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`CreateAttributeInput`](../modules/providers_src.md#createattributeinput) | The input data for creating the attribute. |

#### Returns

`Promise`<`AttributeResponse`\>

A Promise that resolves with the response from the API.

#### Defined in

[providers/src/ports/RegistryApiProvider/RegistryApiProvider.ts:36](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/ports/RegistryApiProvider/RegistryApiProvider.ts#L36)

___

### createAttributesBulk

▸ **createAttributesBulk**(`input`): `Promise`<`CreateAttributesBulkResponse`\>

Creates multiple attributes on the API.

**`Async`**

**`Function`**

**`Name`**

RegistryApiProvider#createAttributesBulk

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`CreateAttributesBulkInput`](../modules/providers_src.md#createattributesbulkinput) | The input data for creating the attributes. |

#### Returns

`Promise`<`CreateAttributesBulkResponse`\>

A Promise that resolves with the response from the API.

#### Defined in

[providers/src/ports/RegistryApiProvider/RegistryApiProvider.ts:23](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/ports/RegistryApiProvider/RegistryApiProvider.ts#L23)
