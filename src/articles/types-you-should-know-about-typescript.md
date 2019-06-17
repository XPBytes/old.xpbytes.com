---
path: "/articles/types-you-should-know-about-typescript/"
published_date: "2019-06-17"
modified_date: "2019-06-17"
author: "Derk-Jan Karrenbeld"
author_id: "https://derk-jan.com/schema/Person.jsonld"
title: "TypeScript types you should know about"
description: "A collection of types, core language features and patterns I use daily and you should add to your collection."
keywords: ["typescript", "patterns", "type guard", "advanced type"]
languages: ["TypeScript"]
license: "CC BY-NC-SA 4.0"
license_url: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
---

In my daily work with TypeScript, there are a lot of utility types and standard
types I use across most if not all projects. This article contains the following
subjects:

- Types in `type-fest`
- Other types (custom, built-in or `utility-types`)
- Common patterns
  - Overloaded type guards
  - `const` arrays and union type
  - Custom errors
  - Setting `this`

![A photo of a lot open books, nicely aligned, taken at FIKA Cafe, Toronto, Canada](../images/articles/types-you-should-know-about-typescript/intro.jpg "Photo by Patrick Tomasso (https://unsplash.com/@impatrickt) on Unsplash (https://unsplash.com/)")

## [`type-fest`][git-type-fest]

A collection of essential TypeScript types.

This `npm` package contains quite a few that are not (yet) built-in. I sometimes
use this package (and import from there) and sometimes copy these to an ambient
declarations file in my project.


### `SafeOmit<T, K>` [🌐][git-safe-omit]

Create a type from an object type without certain keys.

The use-case is a safe(r) version than the built-in `Omit`, which doesn't check
the keys `K` against `T`, but instead check them against `any`.

```typescript
export type SafeOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type ExecutionOptions = {
  debug: boolean;
  dry?: boolean;
  tag: 'default' | 'name';
}

type ExecutionFlags = SafeOmit<ExecutionOptions, 'tag'>
// => {
//  debug: boolean;
//  dry?: boolean | undefined;
// }
```

### `ReadonlyDeep<T>` [🌐][git-readonly-deep]

Convert `object`s, `Map`s, `Set`s, and `Array`s and all of their
properties/elements into immutable structures recursively.

My use-case is primarily when I'm imported JSON, or dealing with [Abstract Syntax Trees][article-ast].
These need to be completely immutable (until they're cloned) and this enforces
that. The built-in `Readonly<T>` only works shallowly.

```typescript
import { ReadonlyDeep } from 'type-fest'
import dataJson = require('./data.json')

const data: ReadonlyDeep<typeof dataJson> = dataJson
data.property.value.push('bar')
//=> error TS2339: Property 'push' does not exist on type 'readonly string[]'
```

### `RequireAtLeastOnce<T, K>` [🌐][git-require-at-least-once]

Create a type that requires at least one of the given properties. The remaining
properties are kept as is.

My use-case is primarily when I have to make sure one of the known interface
methods is present (usually api, service, transform/conversion style objects),
but the rest of the type consists of properties and members that are always
available.

```typescript
import { RequireAtLeastOne } from 'type-fest'

type Responder = {
  text?: () => string;
  json?: () => string;
  secure?: boolean;
}

const responder: RequireAtLeastOne<Responder, 'text' | 'json'> = {
  json: () => '{"message": "ok"}',
  secure: true
}
```

### `Merge<A, B>` [🌐][git-merge]

Merge two types into a new type. Keys of the second type overrides keys of the
first type.

My use-case is primarily when I want to use `Object.assign` instead of using
destructuring/spread to build my merged object. In the example below, you can
see that the default for `Object.assign` produces an incorrect type.

```typescript
type Stringy = {
  bar: string,
  foo: string
}

type NotStri = {
  foo: number
  other: boolean
}

const stringy: Stringy = { bar: 'bar', foo: 'foo' }
const notstri: NotStri = { foo: 42, other: true }

const result1 = Object.assign(stringy, notstri)
//       infers Object.assign<Stringy, NotStri>
result1.foo
// => string & number

export type Merge<T, V> = Omit<T, Extract<keyof T, keyof V>> & V;
const result2: Merge<Stringy, NotStri> = Object.assign(stringy, notstri)

result2.foo
// => number

const result3 = { ...stringy, ...notstri }
// => number
```

### `Mutable<T>` [🌐][git-mutable]

Convert an object with `readonly` properties into a mutable object. Inverse of
`Readonly<T>`.

I personally use this _very sparingly_ as I tend to `Object.freeze` those
variables that are "truly" `Readonly`. As `Required<T>` is the inverse of
`Partial<T>`, `Mutable<T>` is the inverse of `Readonly<T>`.

```typescript
import {Mutable} from 'type-fest';

type Foo = {
	readonly a: number;
	readonly b: string;
};

const mutableFoo: Mutable<Foo> = { a: 1, b: '2' };
mutableFoo.a = 3;
```

## Other types

### `WithFoo<T>`

Whenever I have some data `T` and modify it so that it has more data, I
generally use a wrapping type, so that it's easy to _compose_ the type as I go.

```typescript
interface MyType {
  bar: 'string';
}

type WithFoo<T> = T & { foo: number }

const data: MyType[] = [{ bar: 'first' }, { bar: 'second' }]
const dataWithFoo: WithFoo<MyType>[] = data.map((item, index) => ({ ...item, foo: index }))

// The inverse uses SafeOmit
type WithoutFoo<T> = Omit<T, 'foo'>
```

### AtLeastOne<T>

Sometimes I want to ensure that an array has _at least one item_. There are
type libraries that actually define a _whole lot_ more than just this simple
alias, but that's out of the scope for this article.

```typescript
type AtLeastOne<T> = [T, ...T[]]
```

### `PromiseType<T>` [🌐][git-promise-type]

One of the more interesting unwrappers. This gives the inner type `T` of a
`Promise<T>` type. Usefull when something will unwrap the type, or you want to
work outside of the context of promises or construct a new promise type (e.g.
  `Promise<WithLabel<PromiseType<Original>>>`
).

```typescript
import { PromiseType } from 'utility-types';

type Response = PromiseType<Promise<string>>;
// => string
```

### `ReturnType<T>` (built-in)

Obtain the return type of a function type.

This is one of the more powerfull infered types I use all the type. Instead of
duplicating a type expectation over and over, if I know a function is guaranteed
to call (or expected to call) a function `foo`, and I return the result, I give
it the return type `ReturnType<typeof foo>`, which forwards the return type from
the function declaration of `foo` to the current function.

```typescript
type T10 = ReturnType<() => string>
// => string
type T11 = ReturnType<(s: string) => void>
// => void

function foo(): Promise<number> { return Promise.resolve(42) }
type FooResult = ReturnType<typeof foo>
// => Promise<number>
```

### `InstanceType<T>` (built-in)

Obtain the instance type of a constructor function type.

I use this if I have a constructor type (a type that is constructable), but I
need to work with the `ReturnType<T>` of said constructor. More or less the
inverse of `ConstructorType<T>`.

```typescript
class C {}

type T20 = InstanceType<typeof C>;
// => C
```

### `ConstructorType<T>`

Matches a [`class` constructor][ref-classes]

I use this when I have a type (`T`) and I create a factory that generates these,
or when I need the constructor _type_, given an instance type. More or less the
inverse of `InstanceType<T>`.

```typescript
export type ConstructorType<T> = new(...arguments_: any[]) => T
```

## Common patterns

### Overloaded type guards

I often have custom type guard in order to easily narrow a very broad type. The
issue with a broad type is that you only have access to the _intersection_ until
you check for presence or narrow it.

Sometimes you want to check more than just a broad type, and don't want the
typeguard to assign _never_ if it doesn't match some narrowing predicate. See
the example below.

```typescript
import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree";

// Aliases for these types, so they are easy to access
type Node = TSESTree.Node
type BinaryExpression = TSESTree.BinaryExpression

// Store all the possible values for the operator property
type BinaryOperator = BinaryExpression['operator']

// Define a special type that narrows the operator
type BinaryExpressionWithOperator<T extends BinaryOperator> = BinaryExpression & { operator: T }


// Generic overload that doesn't test for operator
export function isBinaryExpression(node: Node): node is BinaryExpression
// Special overload that only matches if the opertor matches
export function isBinaryExpression<T extends BinaryOperator>(node: Node, operator: T): node is BinaryExpressionWithOperator<T>

// Implementation that allows both arguments
export function isBinaryExpression(node: Node, operator?: string): node is BinaryExpression {
  return node.type === AST_NODE_TYPES.BinaryExpression && (
    operator === undefined
    || node.operator === operator
  )
}

const generic: Node = {
  type: 'BinaryExpression',
  operator: '+',
  /*...*/
} as Node
// => TSESTree.ArrayExpression
//    | TSESTree.ArrayPattern
//    | TSESTree.ArrowFunctionExpression
//    | TSESTree.AssignmentExpression
//    | TSESTree.AssignmentPattern
//    | TSESTree.AwaitExpression
//    | ... 150 more ...
//    | TSESTree.YieldExpression

if (isBinaryExpression(generic)) {
  // typeof generic is now
  // => { type: 'BinaryExpression', operator: BinaryOperator, left: ..., }
} else {
  // typeof generic is now anything except for
  // ~> { type: 'BinaryExpression' }
}

if (isBinaryExpression(generic, '+')) {
  // typeof generic is now
  // => { type: 'BinaryExpression', operator: '+', left: ..., }
} else {
  // typeof generic is still Node
}
```

### `const` arrays and `OneOf<const Array>`

Often you have a distinct set of values you want to allow. Since TypeScript 3.4
there is no need to do weird transformations using helper functions.

The example below has a set of options in `A` and defines the union type
`OneOfA` which is one of the options of `A`.

```typescript
export type OneOf<T extends ReadonlyArray<any>> = T[number]

const A = ['foo', 'bar', 'baz'] as const
type OneOfA = OneOf<typeof A>
// => 'foo' | 'bar' | 'baz'

function indexOf(key: OneOfA): number {
  return A.indexOf(key)
  // never returns -1
}
```

### Custom errors

As per TypeScript 2.1, transpilation of built-ins [is weird][git-changelog-ts].
If you don't need to support IE10 or lower, the following pattern works well:

```typescript
class EarlyFinalization extends Error {
  constructor() {
    super('Early finalization')
    // Doesn't work on IE10-
    Object.setPrototypeOf(this, EarlyFinalization.prototype);

    // Adds proper stacktrace
    Error.captureStackTrace(this, this.constructor)
  }
}
```

### Setting `this`

There are (at least) _two_ ways to tell TypeScript what the current contextual
`this` value of a function is. The first one is adding a parameter `this` to
your function:

```typescript
interface Traverser {
  break(): void
}

function walker(this: Traverser, root: Node) {
  this.break()
  // no error
}
```

This can be very helpful if you're declaring functions outside the scope of a
`class` or similar, but you know what the `this` value will be bound to.

The second method actually allows you to define it _outside_ of the function:

``` typescript
interface HelperContext {
  logError: (error: string) => void;
}

const helperFunctions: { [name: string]: (() => void) } & ThisType<HelperContext> = {
  hello: function() {
      this.logError("Error: Something went wrong!");
      // TypeScript successfully recognizes that "logError" is a part of "this".

      this.update();
      // TS2339: Property 'update' does not exist on HelperContext.
  }
}
```

This can be very helpful if you're binding a collection of functions.

## Conclusion

TypeScript has a lot of gems 💎 and even moreso in userland. Make sure that you
check the built-in types, `type-fest` and your own collection of snippets,
before you resort to `as unknown as X` or `: any`. A lot of the times there
really is a proper way to do thing.

![A photo of yellow and gray, cube shaped houses, at Rotterdam, The Netherlands](../images/articles/types-you-should-know-about-typescript/outro.jpg "Photo by Nicole Baster (https://unsplash.com/@nicolebaster) on Unsplash (https://unsplash.com/)")

[article-ast]: ./writing-an-analyzer-typescript/
[git-changelog-ts]: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
[git-merge]: https://github.com/sindresorhus/type-fest/blob/master/source/merge.d.ts
[git-mutable]: https://github.com/sindresorhus/type-fest/blob/master/source/mutable.d.ts
[git-promise-type]: https://github.com/piotrwitek/utility-types#promisetypet
[git-readonly-deep]: https://github.com/sindresorhus/type-fest/blob/master/source/readonly-deep.d.ts
[git-require-at-least-once]: https://github.com/sindresorhus/type-fest/blob/master/source/require-at-least-one.d.ts
[git-safe-omit]: https://github.com/sindresorhus/type-fest/blob/master/source/
[git-type-fest]: https://github.com/sindresorhus/type-fest
[ref-classes]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
