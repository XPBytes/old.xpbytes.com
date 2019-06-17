---
path: "/articles/writing-a-test-generator-typescript/"
published_date: "2019-06-15"
modified_date: "2019-06-15"
author: "Derk-Jan Karrenbeld"
author_id: "https://derk-jan.com/schema/Person.jsonld"
title: "Writing a test generator in TypeScript"
description: "Given a specification, explore how you can build a generator to test implementations of the specification."
keywords: ["typescript", "javascript", "unit tests", "tdd", "automation", "algorithm"]
languages: ["TypeScript"]
license: "CC BY-NC-SA 4.0"
license_url: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
---

I've recently written [an article][article-analyzer] about [writing an analyzer][article-analyzer]
using TypeScript for submission to the Exercism platform. This time, we'll be
looking at how exercises are defined so they can be implemented across tracks
and write a generator to generate these tests for us.

[Exercism][web-exercism] is an online platform designed to help you improve your
coding skills through practice and mentorship. At the moment of writing, I'm a
maintainer of the [JavaScript][web-track-javascript] and [TypeScript][web-track-typescript]
track.

> This article will **introduce** you to specifications, and **json scheme** in
> particular. We'll be walking the JSON tree and incrementally create an output
> whilst **asking for input** via the **command-line interface** and store the
> responses for later re-use.

When reading this article, think about your own JavaScript and TypeScript code.
Once you understand how we can use our specification to write tooling that can
do work for us, understand that specifications like this are also used for other
automated output, such as [swagger][web-swagger] API documentation, but also
[JSDoc][web-jsdoc] which both have a specification that you use to write content
that those tools can read.

> 🚧 The links to _GitHub_ are all `master` links, meaning the contents may
> change between writing this article and you clicking them.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [📝 The exercise](#%F0%9F%93%9D-the-exercise)
- [Canonical data](#canonical-data)
  - [The `two-fer` specification](#the-two-fer-specification)
  - [The interpretation](#the-interpretation)
- [Writing the generator](#writing-the-generator)
  - [Getting the canonical data](#getting-the-canonical-data)
  - [Processing the canonical data](#processing-the-canonical-data)

## 📝 The exercise

For this article, I'm going to write the generator for the [`two-fer`][git-two-fer]
exercise, for both the TypeScript ánd JavaScript track. The [description][git-two-fer-description] is as follows:

> `Two-fer` or `2-fer` is short for two for one. One for you and one for me.
>
> Given a name, return a string with the message:
>
> ```text
> One for X, one for me.
> ```
>
> Where X is the given name.
>
> However, if the name is missing, return the string:
>
> ```text
> One for you, one for me.
> ```
>
> Here are some examples:
>
> |Name    |String to return
> |:-------|:------------------
> |Alice   |One for Alice, one for me.
> |Bob     |One for Bob, one for me.
> |        |One for you, one for me.
> |Zaphod  |One for Zaphod, one for me.

If this was all we had, and this exercise was implemented across tracks, there
would be no guarantee that there be'd any consistency across tracks, nor would
it be hard to propagate changes to this `README.md`.

## Canonical data

Many languages implement an exercise based on the same generic problem
description. So you might have a "leap year" exercise in Haskell, JavaScript,
Go, Ruby, and Python. The basic premise will be the same, but each language will
tailor the exercise to fit the idioms and idiosyncrasies of that language.

We try to keep the generic descriptions generic -- we avoid
implementation-specific examples, and try not to be too prescriptive about
suggesting how a problem might be solved.

The README of each exercise is pieced together from various bits and pieces of
this shared metadata, along with some information that is custom to the language
track in question.

Some of the problems, just like the example `two-fer`, also have a JSON file
containing canonical test cases. These are used to hand-craft a test suite
generator, allowing us to quickly regenerate test suites when edge cases or
errors are discovered.

The format of the JSON above is defined by the [canonical scheme][git-canonical-schema]:
a [json-schema][web-json-schema] which enforces the structure of all the schemas
in the problem-descriptions repository. It is currently designed to favor
example based tests (`fn(input) === output`), but can be expanded upon to allow
for other types of tests, such as property tests (`object.property === value`).

### The `two-fer` specification

```json
{
  "exercise": "two-fer",
  "version": "1.2.0",
  "cases": [
    {
      "description": "no name given",
      "property": "twoFer",
      "input": {
        "name": null
      },
      "expected": "One for you, one for me."
    },
    {
      "description": "a name given",
      "property": "twoFer",
      "input": {
        "name": "Alice"
      },
      "expected": "One for Alice, one for me."
    },
    {
      "description": "another name given",
      "property": "twoFer",
      "input": {
        "name": "Bob"
      },
      "expected": "One for Bob, one for me."
    }
  ]
}
```

### The interpretation

Together with the comments in the [canonical scheme][git-canonical-schema] about
each field and what it entails, and the descriptive names in the example above,
it's not difficult to determine what each case represents:

- the exercise is `two-fer`
- the [semantic version][web-semver] of the tests is `1.2.0`
- there are three (3) test cases
    1. given no input, the output of `twoFer` is exactly determined
    1. given `"Alice"` as input, the output of `twoFer` is exactly determined
    1. given `"Bob"` as input, the output of `twoFer` is exactly determined

We'll need to support the `null` input. Because of the limitations of `JSON`,
`null` can mean various things:

- `null` means the absence of existence, `Nothing` or `undefined`
- `null` means the absence of value, it's there, but it's empty

The implementation in JavaScript teaches [default values][ref-default-value] for
parameters, so it's important that we can interpret `null` as `undefined`.

## Writing the generator

I started by checking out the problem-specifications repository, so that I can
access the contents directly.

```bash
git clone git@github.com:exercism/problem-specifications.git
```

Imagine the following directory structure:

```text
/problem-specifications
| /exercises
| | /two-fer
| | | /canonical-data.json

/workspace
| /src
```

### Getting the canonical data

Create a new project in `/workspace`, add `typescript` as a dev dependency and
write the first few lines of code:

```typescript
// /workspace/src/index.ts
import path from 'path'

const CANONICAL_DATA = 'canonical-data.json'

// TODO: get from cli arg
const exercise = 'two-fer'
const exercisePath = path.join(
  __dirname, '..', 'problem-specifications', 'exercises', exercise
)
const canonicalDataPath = path.join(exercisePath, CANONICAL_DATA)

const specification = require(canonicalDataPath)
// => { exercise: 'two-fer',
//      version: '1.2.0', ... }
```

Not too much going on. This is some boilerplate in order to get the JSON loaded
into the application. A few key observations:

- Use `path.join` _always_ when dealing with paths. It will correctly handle and
  build paths for you, cross-environments.
- You can `require` json source files, and it will be automatically `JSON.parse`

### Processing the canonical data

```typescript

```



```javascript
// two-fer.spec.js
import { twoFer } from './two-fer'

describe('twoFer()', () => {
  test('no name given', () => {
    expect(twoFer()).toEqual("One for you, one for me.")
  })

  xtest('a name given', () => {
    expect(twoFer("Alice")).toEqual("One for Alice, one for me.")
  })

  xtest('another name given', () => {
    expect(twoFer("Bob")).toEqual("One for Bob, one for me.")
  })
})
```

```typescript
// two-fer.test.ts
import TwoFer from './two-fer'

describe('TwoFer', () => {
  it('no name given', () => {
    const expected = 'One for you, one for me.'
    expect(TwoFer.twoFer()).toEqual(expected)
  })

  xit('a name given', () => {
    const expected = 'One for Alice, one for me.'
    expect(TwoFer.twoFer('Alice')).toEqual(expected)
  })

  xit('another name given', () => {
    const expected = 'One for Bob, one for me.'
    expect(TwoFer.twoFer('Bob')).toEqual(expected)
  })
})
```

[article-analyzer]: https://xpbytes.com/articles/writing-an-analyzer-typescript/
[git-two-fer]: https://github.com/exercism/problem-specifications/blob/master/exercises/two-fer/canonical-data.json
[git-canonical-schema]: https://github.com/exercism/problem-specifications/blob/master/canonical-schema.json
[git-two-fer]: https://github.com/exercism/problem-specifications/blob/master/exercises/two-fer
[git-two-fer-description]: https://github.com/exercism/problem-specifications/blob/master/exercises/two-fer/description.md
[web-exercism]: https://exercism.io
[web-track-javascript]: https://exercism.io/tracks/javascript
[web-track-typescript]: https://exercism.io/tracks/typescript
[web-swagger]: https://swagger.io
[web-jsdoc]: https://jsdoc.app/
