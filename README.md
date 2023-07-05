# Better Errors
A library for expanded error functionality in JavaScript.

## Overview

Better Errors library provides a `BetterError` class extended from the standard `Error` class. It expands the standard error with **code** and **metadata** properties. The library also contains a couple of utility functions & decorators to define default values to minimize repeated code.

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

This example contains setting default value with error's class static method.

```ts
class NotFoundError extends BetterError {}

const NotFoundErrorWithMessage = NotFoundError.withMessage("File was not found!");

throw new NotFoundErrorWithMessage();
// throws:
// NotFoundError: File was not found!
```

---

This example contains a scenario in which an error with default values and some user data as metadata is thrown.

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