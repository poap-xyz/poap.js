[poap.js](../README.md) / [Modules](../modules.md) / [providers/src](../modules/providers_src.md) / HttpProvider

# Interface: HttpProvider

[providers/src](../modules/providers_src.md).HttpProvider

Provides a `request` method for making HTTP requests.

**`Interface`**

HttpProvider

## Table of contents

### Methods

- [request](providers_src.HttpProvider.md#request)

## Methods

### request

▸ **request**<`R`\>(`requestInput`): `Promise`<`R`\>

Makes an HTTP request with the provided configuration.

**`Async`**

**`Function`**

**`Name`**

HttpProvider#request

#### Type parameters

| Name | Description |
| :------ | :------ |
| `R` | The type of the response. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestInput` | `Object` | The configuration for the request. |
| `requestInput.body` | `any` | - |
| `requestInput.endpoint` | `string` | - |
| `requestInput.headers` | `any` | - |
| `requestInput.method` | `string` | - |

#### Returns

`Promise`<`R`\>

A Promise that resolves with the response to the request.

#### Defined in

[providers/src/ports/HttpProvider/HttpProvider.ts:20](https://github.com/poap-xyz/poap.js/blob/acd25e4/packages/providers/src/ports/HttpProvider/HttpProvider.ts#L20)
