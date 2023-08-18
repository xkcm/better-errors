## Overview

Better Errors library provides a `BetterError` class based on the standard `Error` class. It extends the standard error with **code** and **metadata** properties. The library also contains a couple of utility functions & decorators to define default values to minimize repeated code and simplify writing custom errors.

## Installation

You can install the package from NPM registry
```bash
# pnpm
pnpm add @xkcm/better-errors

# yarn
yarn add @xkcm/better-errors

# npm
npm add @xkcm/better-errors
```

## Usage examples

This example contains a simple error class extending from `BetterError` class with a default error code.

```ts
import { BetterError, withCode } from "@xkcm/better-errors";

@withCode("unknown_error")
class UnknownError extends BetterError {}

throw new UnknownError({ message: "An unknown error has occurred!" })

// throws:
// UnknownError: An unknown error has occurred!
// { code: "unknown_error" }
```

For details on `BetterError` constructor see the [Reference](#reference) section.

---

This example contains setting default value using a static method from the error class.

```ts
import { BetterError } from "@xkcm/better-errors";

class NotFoundError extends BetterError {}

const NotFoundErrorWithMessage = NotFoundError.withMessage("File was not found!");

throw new NotFoundErrorWithMessage();
// throws:
// NotFoundError: File was not found!
```

---

This example contains a scenario in which an error with default values and some user data is thrown.

```ts
import { BetterError, withMessage, withCode } from "@xkcm/better-errors";

@withCode("auth.user_does_not_exist")
@withMessage("User does not exist!")
class UserDoesNotExistError extends BetterError<{ userId: string }> {}

// ...

async function findUser(userId: string) {
  const userExists = await database.userExists({ userId });

  if (!userExists) {
    throw new UserDoesNotExistError({ metadata: { userId } });
                                      // ^ type-safe
    // throws:
    // UserDoesNotExist: User does not exist!
    // {
    //    metadata: { userId: ... }
    // }
  }
}

```

For details on type-safety and decorators see the [Reference](#reference) section.

---

Advanced example with a message template, a getter function for metadata and a specified metadata merging behavior.
```ts
import { BetterError, withMetadata, withMessage } from "@xkcm/better-errors";

@withMessage("User with id=%{metadata.id} not found (occurred at %{metadata.timestamp})")
@withMetadata(
  () => ({
    timestamp: new Date(),
  }),
  "compromise:firm",
)
class UserNotFoundError extends BetterError<{
  timestamp: number;
  userId?: number;
}> {}

throw new UserNotFoundError({ metadata: { userId: 42 } });
// throws:
// UserNotFoundError: User with id=42 not found (occurred at <timestamp>)
// {
//   userId: 42,
//   timestamp: <timestamp>
// }
```

## Message template

You can use templates for the error messages. To inject a value to the message use `%{}` symbol.

Example:
```ts
import { BetterError } from "@xkcm/better-errors";

throw new BetterError({
  metadata: { userId: 42 },
  code: "user_does_not_exist",
  message: "User with id=%{metadata.userId} does not exist (E_CODE=%{code})"
});

// throws:
// BetterError: User with id=42 does not exist (E_CODE=user_does_not_exist)
// {
//   metadata: { userId: 42 },
//   code: "user_does_not_exist"
// }

```

Message template has access to `metadata`, `cause` & `code` properties.

## Reference

### `BetterError` class

`BetterError` constructor accepts just one optional object argument with `cause`, `message`, `cause` & `metadata` fields.

```ts
{
  cause?: any;
  code?: string;
  message?: string;
  metadata?: Metadata;
}
```

`Metadata` type comes from the optional generic type. It must extend `Record<string, any>`. This way it's possible to set custom metadata interface and get full IDE autocomplete support.  This type is then used in `.withMetadata` static method and `@withMetadata` decorator.

```ts
import { BetterError, withMetadata } from "@xkcm/better-errors";

@withMetadata(metadata: A) // TypeScript enforces type A here
class ErrorWithMetadata extends BetterError<A> {}
```

### Decorators and static methods

Decorators and static methods accept both direct values and getter functions which are evaluated on error construction.

Example usage of getter function for metadata and message:

```ts
import { BetterError, withMessage, withMetadata } from "@xkcm/better-errors";

@withMetadata(() => ({
  timestamp: Date.now(),
}))
@withMessage(() => `Error with env=${process.env.ENVIRONMENT}`)
class ErrorWithTimestamp extends BetterError<{ timestamp: number }> {}
```

#### `withMessage`
```ts
import { BetterError, withMessage } from "@xkcm/better-errors";

// As a decorator
@withMessage(message: string)
class CustomError extends BetterError {}

// As a static method
CustomError.withMessage(message: string)
```

#### `withCode`
```ts
import { BetterError, withCode } from "@xkcm/better-errors";

// As a decorator
@withCode(code: string)
class CustomError extends BetterError {}

// As a static method
CustomError.withCode(code: string)
```

#### `withMetadata`
```ts
import { BetterError, withMetadata } from "@xkcm/better-errors";

// As a decorator
@withMetadata(metadata: Metadata)
class CustomError extends BetterError<Metadata> {}

// As a static method
CustomError.withMetadata(
  metadata: Metadata,
  mergingBehavior: "firm" | "submissive" | "compromise:firm" | "compromise:submissive",
)
```

**Merging behavior**

Default metadata (from decorator/static method) and metadata from constructor can be merged in 4 ways:
* `firm` - default metadata takes precedence and the metadata from constructor is discarded
* `submissive` - default metadata is discarded and the metadata from constructor takes precedence if present
* `compromise:firm` - default metadata and the metadata from constructor are recursively merged, if a conflict of object keys occurs then the value from the default metadata takes precedence, arrays get concatenated and objects are merged recursively
* `compromise:submissive` - default metadata and the metadata from constructor are recursively merged, if a conflict of object keys occurs then the value from the metadata from constructor takes precedence, arrays get concatenated and objects are merged recursively

The default merging behavior is `submissive`. Library exposes `setDefaultMergingBehavior` function which allows to change the default merging behavior.
```ts
import { setDefaultMergingBehavior } from "@xkcm/better-errors";

setDefaultMergingBehavior("firm");
```

### Utility functions

#### `extractErrorDefaults`

Returns default _metadata_, _message_, _code_ and _merging behavior_ from the error class or its instance, which were set by decorators or static class methods.

Example usage:

```ts
@withMessage("Custom error occurred!")
@withCode("custom_error")
class CustomError extends BetterError {}

const defaultsFromClass = extractErrorDefaults(CustomError);
const defaultsFromInstance = extractErrorDefaults(new CustomError());

console.log("Default code:", defaultsFromClass.code); // logs: Default code: custom_error
```