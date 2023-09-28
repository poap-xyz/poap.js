# POAP

## Description

The `POAP` class represents a POAP (Proof of Attendance Protocol) token with various attributes pertaining to the token itself, the event it's associated with, and its ownership details.

## Constructor

```typescript
constructor(properties: PoapProperties)
```

Creates a new instance of the `POAP` class with specified properties.

### Parameters

- `properties` (`PoapProperties`): An object containing all necessary properties to initialize the `POAP` instance.

## Properties

| Property          | Type     | Description                                           |
|-------------------|----------|-------------------------------------------------------|
| `id`              | `number` | The unique identifier of the POAP token.              |
| `collectorAddress`| `string` | The address of the collector owning the POAP token.   |
| `transferCount`   | `number` | The number of times the POAP token has been transferred. |
| `mintedOn`        | `Date`   | The date and time when the POAP token was minted.     |
| `dropId`          | `number` | The identifier of the drop associated with the POAP token. |
| `imageUrl`        | `string` | The URL of the image representing the POAP token or the associated event. |
| `city`            | `string` | The city where the associated event took place.       |
| `country`         | `string` | The country where the associated event took place.    |
| `description`     | `string` | A description of the associated event or the POAP token. |
| `startDate`       | `Date`   | The start date of the associated event.               |
| `endDate`         | `Date`   | The end date of the associated event.                 |
| `name`            | `string` | The name of the associated event or the POAP token.   |

## PoapProperties Interface

The `PoapProperties` interface defines the shape of the object required by the constructor of the `POAP` class.

```typescript
interface PoapProperties {
  id: number;
  collectorAddress: string;
  transferCount: number;
  mintedOn: Date;
  dropId: number;
  imageUrl: string;
  city: string;
  country: string;
  description: string;
  startDate: Date;
  name: string;
  endDate: Date;
}
```

Each property in the `PoapProperties` interface corresponds to a property in the `POAP` class, and their descriptions are as mentioned above in the Properties section.
