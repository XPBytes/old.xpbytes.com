---
path: "/articles/writing-an-analyzer-typescript/"
published_date: "2019-06-11"
modified_date: "2019-06-11"
author: "Derk-Jan Karrenbeld"
author_id: "https://derk-jan.com/schema/Person.jsonld"
title: "Writing a code analyzer in TypeScript"
description: "The automated mentoring support on exercism is driven by code analyzers. Explore how you can build an analyzer from scratch."
keywords: ["typescript", "javascript", "ast", "estree", "automation", "algorithm", "abstract syntax tree"]
languages: ["TypeScript"]
license: "CC BY-NC-SA 4.0"
license_url: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
---

[Exercism][web-exercism] is an online platform designed to help you improve your
coding skills through practice and mentorship.

[Exercism][web-exercism] provides you with thousands of exercises spread across
numerous language tracks. Once you start a language track you are presented with
a core set of exercises to complete. Each one is a fun and interesting challenge
designed to teach you a little more about the features of a language.

At the moment of writing, I'm a maintainer of the [JavaScript][web-track-javascript]
and [TypeScript][web-track-typescript] track and [recently][blog-ams] we've been
working on automating a part of the experience.

> This article will **introduce** you to AST parsing and walking using
> **ESTree** compatible tools. It specifically looks at certain token types,
> most commonly found in _JavaScript_ and _TypeScript_ code.
>
> It teaches you how to **explore** these trees yourself and refers to
> **code samples** and actual production implementations.

When reading this article, think about your own JavaScript and TypeScript code.
Once you understand how the browser (and tooling, like [`eslint`][git-eslint])
parses your code, you might better understand how the language is defined and
constructed.

> 🚧 The links to _GitHub_ are all `master` links, meaning the contents may
> change between writing this article and you clicking them. However, in order
> to make sure the code samples make sense, the analyzer repository links refer
> to a specific commit (`9ff332b`). This means that the code you see might not
> be the same as what is used today.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [📝 The exercise](#-the-exercise)
  - [JavaScript implementation](#javascript-implementation)
  - [TypeScript implementation](#typescript-implementation)
- [💯 Optimal solutions](#-optimal-solutions)
  - [JavaScript solution](#javascript-solution)
  - [TypeScript solution](#typescript-solution)
- [👩🏽‍💻 Analysing the code](#-analysing-the-code)
  - [💬 Abstract Syntax Trees](#-abstract-syntax-trees)
  - [🏃🏽‍💨 Running the parser](#-running-the-parser)
  - [🔎 Finding the main entrypoint](#-finding-the-main-entrypoint)
  - [🔎 Finding the top-level constant](#-finding-the-top-level-constant)
- [The algorithm](#the-algorithm)
  - [Properties of objects](#properties-of-objects)
  - ["Executing" a property](#executing-a-property)
  - [Matching the identifiers](#matching-the-identifiers)
- [✅ Automated Mentoring](#-automated-mentoring)
  - [📦 Testing exports](#-testing-exports)
    - [Inline exports](#inline-exports)
    - [Specifier exports](#specifier-exports)
    - [CommonJS exports](#commonjs-exports)
- [🔀 Testing varations](#-testing-varations)
- [Walking TypeScript Trees](#walking-typescript-trees)
  - [🔑 Visitor Keys](#-visitor-keys)
  - [📖 Type annotations](#-type-annotations)
  - [Class properties](#class-properties)
  - [↩ Return types](#-return-types)
- [Conclusion](#conclusion)
- [Reference](#reference)
  - [Analyzer reference](#analyzer-reference)
  - [Exercism repositories](#exercism-repositories)
  - [Packages](#packages)

![Photo called 'Feel the freedom' in Dungeness, United Kingdom, displaying a red Volkswagen Samba parked near brown house.](../images/articles/writing-an-analyzer-typescript/intro.jpg "Photo by Zoltan Tasi (https://unsplash.com/@zoltantasi) on Unsplash (https://unsplash.com/)")


## 📝 The exercise

For this article, I'm going to write the analyzer for the [`gigasecond`][git-gigasecond]
exercise, for both the TypeScript ánd JavaScript track. The description is a
mere two lines:

> Given a moment, determine the moment that would be after a gigasecond has
> passed.
>
> A gigasecond is `10^9` (1,000,000,000) seconds.

The [canonical data][git-gigasecond-canonical-data] hints at the code I need to
write, but luckily the exercise is implemented in both the [JavaScript][git-javascript-gigasecond]
and [TypeScript][git-typescript-gigasecond] tracks.

### JavaScript implementation

The JavaScript implementation expects us to write a named export `gigasecond`
which returns a `Date` that is a gigasecond past the input `Date`.

```javascript
  // Test case from the JavaScript track
  test('tells a gigasecond anniversary since midnight', () => {
    const gs = gigasecond(new Date(Date.UTC(2015, 8, 14)));
    const expectedDate = new Date(Date.UTC(2047, 4, 23, 1, 46, 40));
    expect(gs).toEqual(expectedDate);
  });
```

### TypeScript implementation

The TypeScript implementation expects us to write a default export `Gigasecond`
which is a class that has a `date()` function which returns a `Date` that is a
gigasecond past the constructor `Date`.

```typescript
  // Test case from the TypeScript track
  it('tells a gigasecond anniversary since midnight', () => {
    const gs = new Gigasecond(new Date(Date.UTC(2015, 8, 14)))
    const expectedDate = new Date(Date.UTC(2047, 4, 23, 1, 46, 40))
    expect(gs.date()).toEqual(expectedDate)
  })
```

## 💯 Optimal solutions

Before tackling how to write an analyzer for these two implementations, I first
have to establish what the optimal solutions are. If I know the intended code
result, I can try to recognise that and work from there.

### JavaScript solution

The implementation in JavaScript is straightforward. It uses the [`Date`][ref-date]
constructor together with [`Date#getTime`][ref-date-gettime] and a constant to
generate a the appropiate result.

```javascript
const GIGASECOND_IN_MS = (10 ** 9) * 1000

export function gigasecond(date) {
  return new Date(date.getTime() + GIGASECOND_IN_MS)
}
```

It is vital to note the perculiarities here:

- Optimal is extracting the `GIGASECOND_IN_MS` value as a top-level constant
- The constant's value (`(10 ** 9) * 1000`) can optimally be written in many
  equally valid forms. Writing the number out, however, is deemed a smell. All
  the following **SHOULD** be recognised as optimal:
  - `10 ** 12`
  - `1e9 * 1e3`
  - `1e12`,
  - `Math.pow(10, 9) * 1000`
  - `Math.pow(10, 12)`
- [`Date#valueOf`][ref-date-valueof] is _not_ optimal. It is marked as "This
  method is usually called internally by JavaScript and not explicitly in
  code.", even though it's functionally equivalent.
- Finally, [`Date.parse(date)`][ref-date-parse] is not a good candidate as it's
  supposed to work with strings only. The reason it returns the same value as
  `getTime` when given a date, is because that date is coerced to a string and
  then parsed.

### TypeScript solution

The TypeScript implementation expects a `class` as `default export`, and has a
method `date()`. The algorithm is _exactly_ the same as in the JavaScript
solution, but it requires type annotations.

```typescript
const GIGASECOND_IN_MS = (10 ** 9) * 1000

export default class Gigasecond {

  private readonly futureDate: Date

  constructor(date: Readonly<Date>) {
    this.futureDate = new Date(date.getTime() + GIGASECOND_IN_MS)
  }

  date(): Date {
    return this.futureDate
  }
}
```

Apart from the variations and rules as described earlier for JavaScript, the
calculation may be done _either_ in the `constructor` (as shown above) _or_ in
the `date` function. In that last case, it will look as follows:

```typescript
const GIGASECOND_IN_MS = (10 ** 9) * 1000

export default class Gigasecond {

  constructor(private readonly date: Date) { }

  date(): Date {
    return new Date(date.getTime() + GIGASECOND_IN_MS)
  }
}
```

## 👩🏽‍💻 Analysing the code

Now it's time to actually write the analyzer. We'll focus on the JavaScript
implementation first. Because there are already JavaScript analyzers running in
the wild and that work is open source, this example will use the utilities and
base class from the [`javascript-analyzer`][git-javascript-analyzer] repository.

### 💬 Abstract Syntax Trees

The JavaScript Analyzer will be working the [Abstract Syntax Tree (AST)][wiki-ast]
of the code solutions. There are [other][web-spoofax] ways to write an analyzer,
but for the sake of this article, AST parsing is the way to go.

```bash
yarn add @typescript-eslint/parser @typescript-eslint/typescript-estree
```

The [TypeScript ESLint team][git-typescript-eslint] has built a great parser
that outputs an [ESTree][git-estree], a specced format of tokens and information
about the input code. It can work with both `JavaScript` and `TypeScript` and
is therefore great for our use case. I prefer working with this type of tree,
because of the spec which allows for interoptability with other tools.

The `parser` deals with the eslint configuration and then invokes the
`typescript-estree` package which _compiles the code using TypeScript_ and
transforms the result to match the [ESTree][git-estree]. You can head on over to
[AST Explorer][web-ast-explorer] and try this out yourself by pasting the
example code from above into the input field and selecting
`@typescript-eslint/parser`. **⚠ Note**: The version of the parser here is
usually not up-to-date with the latest parser.

### 🏃🏽‍💨 Running the parser

Now that the packages are in place, let's parse the input code.

```typescript
import { parse, TSESTreeOptions } from "@typescript-eslint/typescript-estree";

const options: TSESTreeOptions = {
  comment: false,
  jsx: false
}

const program = parse(source, options)
// => Program({ body: [...], sourceType: "module", tokens: [...] })
```

This gives us the same output as you see in [AST Explorer][web-ast-explorer],
with at the root a `Program` and its `body`. We won't need the other fields, but
`tokens` is interesting. It lists the parsed tokens from the source, as it was
building the tree.

> 💎 You can find this in [`parsers/AstParser.ts`][git-parsers-ast-parser]

### 🔎 Finding the main entrypoint

We're looking for a function called `gigasecond`. We know the following things:

- It _must_ be `export`ed
- Its name _must_ be `gigasecond`

The input code _declares a function_, like in the optimal solution above, so the
tree holds a `FunctionDeclaration` with an `Identifier`:

```javascript
export function gigasecond(date) {
  // ...
}
```

```javascript
{
  type: "FunctionDeclaration",
  id: {
    type: "Identifier",
    name: "gigasecond"
  },
  generator: false,
  expression: false,
  async: false,
  params: [ ... ],
  // The body is a block { ... }
  body: {
    type: "BlockStatement",
    body: [ ... ]
  }
}
```

This is something it can search for. The most common way to _search_ in an AST
is by _walking_ that tree. You start at some node (usually the root / program)
and visit each item.

We know that our parsed `EStree` is **compatible with [`eslint`][git-eslint]**
and that [`eslint`][git-eslint], just like [`prettier`][git-prettier] can
recognise (and transform) code.

```bash
# Not a dev dependency!
yarn add eslint
```

```typescript
import { TSESTree } from "@typescript-eslint/typescript-estree"
import { traverse } from 'eslint/lib/util/traverser'

traverse(program, {
  enter(node: TSESTree.Node) {
    // ...
  }
})
```

When writing this code, TypeScript will complain that there are no types for
this library, which is unfortunately still true at moment of writing. However,
you can [copy this `declarations.d.ts`][git-eslint-types] I wrote in order to
get type completion.

The `enter` method will be called for _each node_ in the program. Inside the
`enter` block, your in the "TraverserContext" which exposes two methods:

- `this.skip()`: skips the node from further traversal, meaning it will not
  visit any other keys (and therefore children) of the current node;
- `this.break()`: completely stop traversing.

Finding the entrypoint is now straightforward.

```typescript
import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/typescript-estree"

let entry: TSESTree.FunctionDeclaration | undefined = undefined

traverse(program, {
  enter(node: TSESTree.Node) {
    switch (node.type) {

      // function name() {}
      case AST_NODE_TYPES.FunctionDeclaration:
        if (node.id && node.id.name === 'gigasecond') {
          entry = node
          this.break()
        }
        break;
    }
  }
})

entry
// => FunctionDeclaration({
//      id: { type: "Identifier", name: "gigasecond" }, ...
//    })
```

Unfortunately the walker above _only_ finds `FunctionDeclaration` and fails on
equivalent code usign an `ArrowFunctionExpression` or `FunctionExpression`. More
on that later.

> 💎 You can find this in [`analyzers/utils/extract_main_method.ts`][git-extract-main-method]

### 🔎 Finding the top-level constant

The code finds the first of the two components. Now it also needs to find the
second. A top-level `const`, but the name is not known.

```javascript
const GIGASECOND_IN_MS = (10 ** 9) * 1000
```

```javascript
{
  type: "VariableDeclaration",
  declarations: [
    {
      type: "VariableDeclarator",
      id: {
        type: "Identifier",
        name: "GIGASECOND_IN_MS"
      },
      init: {
        type: "BinaryExpression",
        operator: "*",
        // Left is another BinaryExpression with **
        left: { ... },
        // Right is a Literal
        right: { ... }
      }
    }
  ],
  kind: "const"
}
```

Nothing here is _particularly_ helpful. Given the variations of data it needs to
accept, I can't rely on `init` being a certain type. The name is also not fixed
as it's not `export`ed and therefore not tested.

_However_, there are a few constraints that will help here:

- It must be a top-level constant
- It can _not_ be named `gigasecond`
- In an optimal solution, there is really only _one_ top-level constant that is
  not the `entry`,

```typescript
type FoundConst = { kind: TSESTree.VariableDeclaration['kind'] }
  & TSESTree.VariableDeclarator

let bigNumber: FoundConst | undefined = undefined

traverse(program, {
  enter(node: TSESTree.Node) {
    switch (node.type) {

      // const NAME = ...
      case AST_NODE_TYPES.VariableDeclaration:
        const declaration = node.declarations.find(
          (declaration) => declaration.id && declaration.id.name !== 'gigasecond')
        )

        if (declaration) {
          bigNumber = { kind: node.kind, ...declaration }
          this.break()
        }

        break;

      default:
        // This doesn't declare a variable, so skip the node
        this.skip()
    }
  }
})
```

Later, I can check `bigNumber['kind']` and make sure it's `const`, or otherwise
attach a message that `const` is preferred.

> 💎 You can find this in [`analyzers/utils/find_top_level_constants.ts`][git-find-top-level-constants]

## The algorithm

Now that I found the `entry` point, I can figure out what the name of the
argument is (`date`). Because I also know the top-level constant, I know what
the constant name is `GIGASECOND_IN_MS`.

```javascript
new Date(...)
```

Nothing too fancy here. It's a `new` expression with an expression as the first
argument.

```javascript
{
  type: "NewExpression",
  callee: {
    type: "Identifier",
    name: "Date"
  },
  arguments: [ ... ]
}
```

```typescript
let newDate: TSESTree.NewExpression | undefined = undefined

traverse(program, {
  enter(node: TSESTree.Node) {
    switch (node.type) {

      // new Date(...)
      case AST_NODE_TYPES.NewExpression:
        if (
          node.callee.type === AST_NODE_TYPES.Identifier
          && node.callee.name === 'Date'
        ) {
          newDate = node;
          this.break()
        }
        break;

      default:
        // This doesn't declare a variable, so skip the node
        this.skip()
    }
  }
})
```

> 💎 You can find this in [`analyzers/utils/find_new_expression.ts`][git-find-new-expression]

The inner expression is of type `BinaryExpression`. In EStree compatible output,
and operator with _two_ components (such as `+`, `-`, `*`) is a binary
expression, whereas those with _one_ component (such as `~` and `!`) are unary
expressions.

```javascript
date.getTime() + GIGASECOND_IN_MS
```

```javascript
{
  type: "BinaryExpression",
  operator: "+",
  left: {
    type: "CallExpression",
    callee: {
      type: "MemberExpression",
      object: {
        type: "Identifier",
        name: "date"
      },
      property: {
        type: "Identifier",
        name: "getTime"
      }
    },
    arguments: []
  },
  right: {
    type: "Identifier",
    name: "GIGASECOND_IN_MS"
  }
}
```

Quite a few things we've already seen and also a few new types. Let's look at
those.

### Properties of objects

When the parser encounters a object property accessor (`object.property`), it is
parsed as a `MemberExpression`. Depending on the way of writing, the property is
either an `Identifier` or a `Literal`.

```javascript
date.getTime
// ^       ^
// object  property
// |       |
// |       identifier (name = getTime)
// identifier (name = date)

date['getTime']
// ^       ^
// object  property
// |       |
// |       literal (value = getTime)
// identifier (name = date)
```

### "Executing" a property

If there are parentheses behind the `MemberExpression`, the entire expression
is parsed as a child of a `CallExpression`. This is also the case for
parentheses following an _indentifier_.

```javascript
date.getTime ( )
// ---------| ^ |
// ^        | argument(s) of call expression
// member expression
//              |
// -------------|
// call expression

gigasecond(INPUT)
// ------|   ^   |
// ^     | argument of call expression
// identifier    |
//               |
// --------------|
// call expression
```

### Matching the identifiers

There are two identifiers provided by the source code that I need to find and
match against:

- the gigasecond first argument (used in `arg.getTime()`)
- the top-level constant (used in `time + CONSTANT`)

```typescript

const argumentName = entry.id.name
// => "gigasecond"
const constantName = bigNumber.id.name
// => "GIGASECOND_IN_MS"

let optimalExpression: boolean = false

// NOTE: passing in the newDate as root, so this is a subtree traversal!
traverse(newDate, {
  enter(node: TSESTree.Node) {
    switch (node.type) {

      // new Date(x.z() + y)
      case AST_NODE_TYPES.BinaryExpression:
        this.break()

        if (node.operator !== '+') {
          optimalExpression = false;
          return;
        }


        // This allows the order to be reversed
        const leftType = node.left.type
        const constSide = leftType === AST_NODE_TYPES.Identifier
          ? node.left
          : node.right
        const expressionSide = leftType === AST_NODE_TYPES.CallExpression
          ? node.left
          : node.right

        if (constSide === expressionSide) {
          // throw new Error("not optimal! this is not x.z() + y")
          optimalExpression = false
          return
        }

        if (constSide.id.name !== constantName) {
          optimalExpression = false
          return
        }

        const { object, property } = expressionSide.callee
        optimalExpression =
          object.type === AST_NODE_TYPES.Identifier
          && object.name === argumentName
          && ((
            property.type === AST_NODE_TYPES.Identifier
            && property.name === 'getTime'
          ) || (
            property.type === AST_NODE_TYPES.Literal
            && property.value === 'getTime'
          ))

      break;
    }
  }
})
```

> 💎 You can find this in:
>
> - [`analyzers/utils/find_member_call.ts`][git-find-member-call],
> - [`analyzers/utils/is_binary_expression.ts`][git-is-binary-expression],
> - [`analyzers/utils/is_identifier.ts`][git-is-identifier], and
> - [`analyzers/utils/is_literal.ts`][git-is-literal].

## ✅ Automated Mentoring

When all these pieces are put together, it is the analyzer for gigasecond. There
are a few more things to check:

- Is the `bigNumber.kind` equal to `"const"`? If not, add a comment
- Is the value of `GIGASECOND_IN_MS` using one of the comprehensions? If not,
  add a comment.
- Is there only _one_ argument to `gigasecond`? Make sure it's not a `...splat`
  argument, and that it has no `value = "default"`.
- Is `gigasecond` actually exported? Is the `export` inline? if not, add a
  comment.

Since the first one was mentioned (`kind` equality check) and the second one is
very similar to the _inner_ expression of the `new Date(...)` call, I've left
out how to implement these. You can check the
[gigasecond analyzer source code][git-javascript-analyzer-gigasecond] if you
need some inspiration. The third one is testing the `entry` for `parameters`.

As for `export`s, these are handled by [`💎 extract_export`][git-extract-export],
but I'll show you the gist of it.

### 📦 Testing exports

Exports in `JavaScript` and `TypeScript` basically come in three types. Those
using a core language feature (read: use a keyword) are the easiest:

```javascript
export const inline = {}
export default class InlineClass {}
export default defaultSpecifier
export { specifier }
export { specifier as renamed }
```

The `default` `export` have their own token type `ExportDefaultDeclaration`.

```javascript
{
  type: "ExportDefaultDeclaration",
  declaration: {
    // ...
  }
}
```

Those without a `default` modifier are of type `ExportNamedDeclaration`.

```javascript
{
  type: "ExportNamedDeclaration",
  declaration: {
    // ...
  }
}
```

The `declaration` property is where it gets slightly tricky. The inline `export`
statements, regardless if they're default or not, are followed by the same token
types as if they did not have the `export` keyword similarly to how writing
parentheses wraps an expression in a `CallExpression`.

#### Inline exports

This means that the first example is a `VariableDeclaration` with a single
`VariableDeclaractor`: the `id` is an `Identifier` with `name = "inline"` and the
`init` is an `ObjectExpression`. Similarly the second example is a
`ClassDeclaration` with as `id` an `Identifier` with `name = "InlineClass"`.

#### Specifier exports

The third has a `declaration` of type `Identifier` with
`name = "defaultSpecifier"`. This is similar to `inline` exports

The fourth and fifth however, _do **not** have a `declaration`_ property.
Instead, they have a `specifiers` property with, in this case, one item:

```javascript
{
  type: "ExportSpecifier",
  local: {
    type: "Identifier",
    name: "specifier"
  }
  exported: {
    type: "Identifier",
    name: "specifier" // or "renamed"
  }
}
```

Use the `local` property to determine _what_ is exported (what the internal name
is) and the `exported` property how it's _imported_ (what the exported name is).

#### CommonJS exports

Finally there are those exports that don't use a keyword but instead use the
(as far as I'm concerned) defunct `module.exports`.

```javascript
module.exports = singleExport
module.exports = { specifier }
module.exports.default = defaultExport
module.exports.renamed = specifier
```

Since these don't use keywords, they're interpreted as `ExpressionStatement`s,
as they're `AssignmentExpression`s. Here is a quick overview table of the
important properties and representations:

| expression | type | prop | value |
|----|----|----|----|
| `module.exports.renamed = specifier` | `AssignmentExpression` | | |
| | |  `operator` | `"="`
| | `Identifier` | `right` | `"specifier"`
| | `MemberExpression` | `left` | `🔽 module.exports.renamed 🔽`
| `module.exports.renamed` | `MemberExpression` |
| | `Identifier` | `property` | `"renamed"` |
| | `MemberExpression` | `object` | `🔽 module.exports 🔽` |
| `module.exports` | `MemberExpression` |
| | `Identifier` | `property` | `"exports"` |
| | `Identifier` | `object` | `"module"` |

There is also the variant of using the `object['accessor']`, where `accessor`
is not an `Identifier` but a `Literal`, but otherwise that is the same.

## 🔀 Testing varations

As mentioned before, there are many ways to write functions in JavaScript and
TypeScript. In the [source code][git-javascript-analyzer] for the analyzer there
is a utility method [`💎 extract_main_method`][git-extract-main-method]. It can
detect the following variations:

```javascript
function name() {}
// FunctionDeclaration

const name = () => {}
// ArrowFunctionExpression

const name = function() {}
// FunctionExpression

export default {
  name: () => {}
}
// ExportDefaultDeclaration + ObjectExpression + (Arrow)FunctionExpression
```

And the TypeScript specific variants (but they work on both)

```typescript
class Foo {
  name() {}
}
// MethodDefinition + FunctionExpression

class Foo {
  static name = () => {}
  static name = function name() {}
}
// ClassProperty + (Arrow)FunctionExpression
```

## Walking TypeScript Trees

As you've noticed, all we did so far is checking the JavaScript code and shown
how that is parsed and walked. In order to adapt the solution so that TypeScript
code can be parsed with it, there is _one_ thing to change in the walker and
a few extra properties to test for.

### 🔑 Visitor Keys

When the `traverser` is walking the tree, it decides which nodes to "walk 🚶🏽‍"
based on a set of keys called `visitor keys`. Since `TypeScript` is a _superset_
of `JavaScript` it has the same keys and then some.

```typescript
import { visitorKeys } from "@typescript-eslint/parser/dist/visitor-keys"

traverse(root, {
  enter(node: Node) {
    // ...
  },

  visitorKeys
})
```

If you look at the [source of that file][git-visitor-keys], you'll see that it
actually imports the [`eslint` visitor keys][git-eslint-visitor-keys] (in order
to visit all the JavaScript keys) and adds the specific TypeScript keys.

### 📖 Type annotations

These are interesting.

```typescript
class Gigasecond {
  constructor(private readonly date: Date) { }
}
```

```javascript
{
  type: "ClassDeclaration",
  id: {
    type: "Identifier",
    name: "Gigasecond"
  },
  // everything inside the class { body }
  body: {
    type: "ClassBody",
    body: [
      {
        // a constructor is a regular method definition...
        type: "MethodDefinition",
        key: {
          type: "Identifier",
          name: "constructor"
        },
        value: {
          type: "FunctionExpression",
          params: [{ /*...*/ }],
          generator: false,
          expression: false,
          async: false,
          body: { /*...*/ }
        }
        computed: false,
        static: false,  // (typescript static keyword)
        // ... but with a special kind
        kind: 'constructor'
      }
    ]
  }
}
```

The above has no special properties over the JavaScript equivalent, but that's
because there _are no type annotations in the source_ except for in the `params`
of the `constructor`:

```javascript
{
  type: "Identifier",
  name: "date",
  // : ...
  typeAnnotation: {
    type: "TSTypeAnnotation",
    typeAnnotation: {
      // Readonly
      type: "TSTypeReference",
      typeName: {
        type: "Identifier"
        name: "Readonly"
      },
      // <...>
      typeParameters: {
        type: "TSTypeParameterInstantiation",
        // Each type between the < brackets >
        params: [
          {
            type: "TSTypeReference",
            typeName: {
              type: "Identifier",
              name: "Date"
            }
          }
        ]
      }
    }
  }
}
```

A few key observations:

- The type annotation has its own visitor key `typeAnnotation`,
- All the TypeScript nodes start with `TS`,
- A generic type is just a `TSTypeReference` with both a `typeName` and one or
  multiple `typeParameters`.
- Stripping types is _almost_ as easy as removing the `typeAnnotation` keys,
  which is _almost_ exactly what [babel's `preset-typescript`][web-babel-typescript]
  does.

### Class properties

In TypeScript you can annotate class properties with keywords such as `private`
and `readonly`. Additionally, they can have a type (which is `Date` in this
example).

```typescript
class Gigasecond {
  private readonly futureDate: Date
}
```

```javascript
{
  type: "ClassProperty",
  key: {
    type: "Identifier",
    name: "futureDate"
  },
  computed: false,
  static: false,            // static keyword
  readonly: true,           // readonly keyword
  accessibility: "private", // private, protected, public keywords
  typeAnnotation: {
    type: "TSTypeAnnotation",
    typeAnnotation: {
      type: "TSTypeReference",
      typeName: {
        type: "Identifier",
        name: "Date"
      }
    }
  }
}
```

The TypeScript keywords `private` and `readonly` modify the _`ClassProperty`_
directly, but the type is again on `typeAnnotation`. If the type annotation is
left out the source code (read: implicit `any`), the `typeAnnotation` key is
not present on the AST.

### ↩ Return types

The final type we'll look at for now are function `return` types. Most other
type annotations are just variations on this and the ones mentioned before.

```typescript
class Gigasecond {
  date(): Date {
    // ...
  }
}
```
```javascript
{
  type: "MethodDefinition",
  key: {
    type: "Identifier",
    name: "date"
  },
  value: {
    type: "FunctionExpression",
    generator: false,
    expression: false,
    async: false,
    body: { /*...*/ },
    params: [],
    returnType: {
      type: "TSTypeAnnotation",
      typeAnnotation: {
        type: "TSTypeReference",
        typeName: {
          type: "Identifier",
          name: "Date"
        }
      }
    }
  },
  computed: false,
  static: false, // static keyword
  kind: "method"
}
```

As you might have noticed, the `typeAnnotation` is **not** on the
`MethodDefinition`. That is because a method definition on a class is actually
binding a function expression `(): Date { ... }` to the identifier `date`.

On the `FunctionExpression` you can find the previously not encountered type
annotation `returnType`. Its structure is the same as `typeAnnotation`s for
`ClassProperty`.

## Conclusion

Interpreting code as an Abstract Syntax Tree and seeking out certain properties
is a lot of tree walking; because there is a specification for the format of the
output of certain AST Parsers, you can write tooling yourself.

The contents of this article, in a different format, is being used to
automatically approve the `gigasecond` exercise, given that the student has
provided an exact _variation_ of the optimal solution. There is enough surface
to hook into the findings of the analyzer to provide meaningfull commentary,
should the student not have provided an optimal solution.

![Photo of Erasmusbrug, Rotterdam, The Netherlands, displaying gray concrete bridge near buildings.](../images/articles/writing-an-analyzer-typescript/outro.jpg "Photo by Miles Vanderlooven (https://unsplash.com/@mylesuk) on Unsplash (https://unsplash.com/)")


[web-exercism]: https://exercism.io
[web-track-javascript]: https://exercism.io/tracks/javascript
[web-track-typescript]: https://exercism.io/tracks/typescript
[web-ast-explorer]: https://astexplorer.net/
[web-spoofax]: https://www.metaborg.org/en/latest/
[web-babel-typescript]: https://babeljs.io/docs/en/babel-preset-typescript
[blog-ams]: https://exercism.io/blog/track-anatomy-project
[wiki-ast]: https://en.wikipedia.org/wiki/Abstract_syntax_tree
[git-gigasecond]: https://github.com/exercism/problem-specifications/blob/master/exercises/gigasecond
[git-gigasecond-canonical-data]: https://github.com/exercism/problem-specifications/blob/master/exercises/gigasecond/canonical-data.json
[git-javascript-gigasecond]: https://github.com/exercism/javascript/blob/master/exercises/gigasecond/gigasecond.spec.js
[git-typescript-gigasecond]: https://github.com/exercism/typescript/blob/master/exercises/gigasecond/gigasecond.test.ts
[git-javascript-analyzer]: https://github.com/exercism/javascript-analyzer/blob/9ff332bb365bdb84c53e7b14064479ae13876fac/src/analyzers/utils
[git-javascript-analyzer-gigasecond]: https://github.com/exercism/javascript-analyzer/tree/40116841771cc3aeb6d3fbe645495be0a3a405a5/src/analyzers/gigasecond
[git-extract-export]: https://github.com/exercism/javascript-analyzer/blob/9ff332bb365bdb84c53e7b14064479ae13876fac/src/analyzers/utils/extract_export.ts
[git-extract-main-method]: https://github.com/exercism/javascript-analyzer/blob/9ff332bb365bdb84c53e7b14064479ae13876fac/src/analyzers/utils/extract_main_method.ts
[git-find-top-level-constants]: https://github.com/exercism/javascript-analyzer/blob/9ff332bb365bdb84c53e7b14064479ae13876fac/src/analyzers/utils/find_top_level_constants.ts
[git-parsers-ast-parser]: https://github.com/exercism/javascript-analyzer/blob/9ff332bb365bdb84c53e7b14064479ae13876fac/src/parsers/AstParser.ts
[git-is-binary-expression]: https://github.com/exercism/javascript-analyzer/blob/9ff332bb365bdb84c53e7b14064479ae13876fac/src/analyzers/utils/is_binary_expression.ts
[git-is-literal]: https://github.com/exercism/javascript-analyzer/blob/9ff332bb365bdb84c53e7b14064479ae13876fac/src/analyzers/utils/is_literal.ts
[git-is-identifier]: https://github.com/exercism/javascript-analyzer/blob/9ff332bb365bdb84c53e7b14064479ae13876fac/src/analyzers/utils/is_identifier.ts
[git-find-member-call]: https://github.com/exercism/javascript-analyzer/blob/9ff332bb365bdb84c53e7b14064479ae13876fac/src/analyzers/utils/find_member_call.ts
[git-find-new-expression]: https://github.com/exercism/javascript-analyzer/blob/9ff332bb365bdb84c53e7b14064479ae13876fac/src/analyzers/utils/find_new_expression.ts
[git-typescript-eslint]: https://github.com/typescript-eslint/typescript-eslint
[git-estree]: https://github.com/estree/estree
[git-eslint]: https://github.com/eslint/eslint
[git-eslint-types]: https://github.com/exercism/javascript-analyzer/blob/9ff332bb365bdb84c53e7b14064479ae13876fac/src/declarations.d.ts
[git-eslint-visitor-keys]: https://github.com/eslint/eslint-visitor-keys
[git-prettier]: https://github.com/prettier/prettier
[git-visitor-keys]: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/parser/src/visitor-keys.ts
[ref-date]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[ref-date-gettime]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
[ref-date-valueof]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/valueof
[ref-date-parse]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse

## Reference

- [Date][ref-date]
- [Date`#getTime`][ref-date-gettime]
- [Date`.parse`][ref-date-parse]
- [Date`#valueOf`][ref-date-valueof]

### Analyzer reference

- [AstParser`#parse`][git-parsers-ast-parser]
- [`extractExport`][git-extract-export]
- [`extractMainMethod`][git-extract-main-method]
- [`findMemberCall`][git-find-member-call]
- [`findNewExpression`][git-find-new-expression]
- [`findTopLevelConstants`][git-find-top-level-constants]
- [`isBinaryExpression`][git-is-binary-expression]
- [`isIdentifier`][git-is-identifier]
- [`isLiteral`][git-is-literal]

### Exercism repositories

- [`problem-specifications/gigasecond`][git-gigasecond] | [canonical-data][git-gigasecond-canonical-data]
- [`javascript/gigasecond`][git-javascript-gigasecond]
- [`typescript/gigasecond`][git-typescript-gigasecond]
- [`javascript-analyzer/gigasecond`][git-javascript-analyzer-gigasecond]
- [`javascript-analyzer`][git-javascript-analyzer]

### Packages

- [`@typescript-eslint/parser`][git-typescript-eslint]
- [`@typescript-eslint/typescript-estree`][git-typescript-eslint]
- [`prettier`][git-prettier]
- [`eslint`][git-eslint]
- [`eslint-visitor-keys`][git-eslint-visitor-keys]
