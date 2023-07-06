# Better Errors
A library for expanded error functionality in JavaScript.

## Overview

Better Errors library provides a `BetterError` class extended from the standard `Error` class. It expands the standard error with **code** and **metadata** properties. The library also contains a couple of utility functions & decorators to define default values to minimize repeated code.

## Installation

You can install the package from NPM registry
```sh
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
class NotFoundError extends BetterError {}

const NotFoundErrorWithMessage = NotFoundError.withMessage("File was not found!");

throw new NotFoundErrorWithMessage();
// throws:
// NotFoundError: File was not found!
```

---

This example contains a scenario in which an error with default values and some user data is thrown.

```ts
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

Advanced example with a message template and a getter function for metadata.
```ts
@withMetadata(() => ({
  timestamp: new Date()
}))
@withMessage("Server error (occurred at %{metadata.timestamp})")
class ServerError extends BetterError<{ timestamp: number }> {}
```

## Message template

You can use templates for the error messages. To inject a value to the message use `%{}` symbol.

Example:
```ts
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

#### `BetterError` class

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
@withMetadata(/* TypeScript enforces type A here */)
class ErrorWithMetadata extends BetterError<A> {}
```

### Decorators and static methods

Decorators and static methods accept both direct values and getter functions which are evaluated on error construction.

Example usage of getter function for metadata:

```ts
@withMetadata(() => ({
  timestamp: Date.now(),
}))
class ErrorWithTimestamp extends BetterError<{ timestamp: number }> {}
```

#### `withMessage`
```ts
// As a decorator
@withMessage(/* string */)
class CustomError extends BetterError {}

// As a static method
CustomError.withMessage(/* string */)
```

#### `withCode`
```ts
// As a decorator
@withCode(/* string */)
class CustomError extends BetterError {}

// As a static method
CustomError.withCode(/* string */)
```

#### `withMetadata`
```ts
// As a decorator
@withMetadata(/* Metadata type inferred from the error class */)
class CustomError extends BetterError</* Metadata type here */> {}

// As a static method
CustomError.withMetadata(/* Metadata type */)
```
