[poap.js](../README.md) / [Modules](../modules.md) / providers/src

# Module: providers/src

## Table of contents

### Classes

- [PoapCompass](../classes/providers_src.PoapCompass.md)
- [PoapDropApi](../classes/providers_src.PoapDropApi.md)
- [PoapMomentsApi](../classes/providers_src.PoapMomentsApi.md)
- [PoapRegistryApi](../classes/providers_src.PoapRegistryApi.md)

### Interfaces

- [CompassProvider](../interfaces/providers_src.CompassProvider.md)
- [DropApiProvider](../interfaces/providers_src.DropApiProvider.md)
- [HttpProvider](../interfaces/providers_src.HttpProvider.md)
- [MomentsApiProvider](../interfaces/providers_src.MomentsApiProvider.md)
- [RegistryApiProvider](../interfaces/providers_src.RegistryApiProvider.md)

### Type Aliases

- [CreateAttribute](providers_src.md#createattribute)
- [CreateAttributeInput](providers_src.md#createattributeinput)
- [CreateAttributesBulkInput](providers_src.md#createattributesbulkinput)

## Type Aliases

### CreateAttribute

Ƭ **CreateAttribute**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dropId` | `number` |
| `key` | `string` |
| `tokenId?` | `number` |
| `value` | `string` |

#### Defined in

[providers/src/ports/RegistryApiProvider/Types/input.ts:1](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/ports/RegistryApiProvider/Types/input.ts#L1)

___

### CreateAttributeInput

Ƭ **CreateAttributeInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `attribute` | [`CreateAttribute`](providers_src.md#createattribute) |

#### Defined in

[providers/src/ports/RegistryApiProvider/Types/input.ts:12](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/ports/RegistryApiProvider/Types/input.ts#L12)

___

### CreateAttributesBulkInput

Ƭ **CreateAttributesBulkInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `attributes` | [`CreateAttribute`](providers_src.md#createattribute)[] |

#### Defined in

[providers/src/ports/RegistryApiProvider/Types/input.ts:8](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/ports/RegistryApiProvider/Types/input.ts#L8)
