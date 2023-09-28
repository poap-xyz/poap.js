# POAPReservation

## Description

The `POAPReservation` class represents a reservation of a POAP (Proof of Attendance Protocol) token associated with an email address. This class encapsulates details about the event for which the POAP token is reserved.

## Constructor

```typescript
constructor(properties: POAPReservationProperties)
```

Creates a new instance of the `POAPReservation` class with the specified properties.

### Parameters

- `properties` (`POAPReservationProperties`): An object containing all necessary properties to initialize the `POAPReservation` instance.

## Properties

| Property        | Type     | Description                                                      |
|-----------------|----------|------------------------------------------------------------------|
| `email`         | `string` | The email address where the POAP token is reserved.              |
| `dropId`        | `number` | The identifier of the drop associated with the POAP reservation. |
| `imageUrl`      | `string` | The URL of the image representing the POAP reservation or the associated event. |
| `city`          | `string` | The city where the associated event took place.                  |
| `country`       | `string` | The country where the associated event took place.               |
| `description`   | `string` | A description of the associated event or the POAP reservation.   |
| `startDate`     | `Date`   | The start date of the associated event.                          |
| `endDate`       | `Date`   | The end date of the associated event.                            |
| `name`          | `string` | The name of the associated event or the POAP reservation.        |

## POAPReservationProperties Interface

The `POAPReservationProperties` interface defines the shape of the object required by the constructor of the `POAPReservation` class.

```typescript
interface POAPReservationProperties {
  email: string;
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

Each property in the `POAPReservationProperties` interface corresponds to a property in the `POAPReservation` class, and their descriptions are as mentioned above in the Properties section.