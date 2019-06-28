---
path: "/articles/javascript-is-not-call-by-reference/"
published_date: "2019-06-27"
modified_date: "2019-06-27"
author: "Derk-Jan Karrenbeld"
author_id: "https://derk-jan.com/schema/Person.jsonld"
title: "JavaScript, Ruby and C are not call by reference"
description: "The difference between call by value, call by reference and a recap of call by sharing."
keywords: ["javascript", "ruby", "c", "computer science", "advanced type"]
languages: ["JavaScript", "Ruby", "C", "PHP"]
license: "CC BY-NC-SA 4.0"
license_url: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
---

> 🛑 This article is a response to various articles in the wild which state that JavaScript and Ruby are "Call/Pass by reference" for objects and "Call/Pass by value" for primitives.
>
> Many of these articles provide a lot of valuable information and this article is not to unequivically say that those articles should not have been written or are useless. Instead, this article attempts to explore the semantic, yet pedantic, meanings and definitions of
>
> - call by reference
> - pass a reference
> - reference type
> - reference

First, I would like to make a few statements, after which Ill try to explore what these statements actually mean and why I've made them, contrary to [various][blog-source-1] [articles][blog-source-2] [in][blog-source-3] [the][blog-source-4] [wild][blog-source-5].

> ☕ When you see this emoji (☕), I try to give a non-code analogy to help you better understand what's going on. These abstractions are pretty leaky and might not hold up, but they're only meant in the context of the paragraphs that surround them. Take them with a grain of salt.

![Black and yellow metal signage beside green grasses during daytime, in Yangmingshan, Taipei, Taiwan](../images/articles/javascript-is-not-call-by-reference/intro.jpg "Photo by Treddy Chen (https://unsplash.com/@tchen_7993) on Unsplash (https://unsplash.com/)")

## Statements

- **JavaScript is _always_ call by value**.
- **Ruby is _always_ call by value**.
- **C is _always_ call by value**.
- The terminology is confusing and perhaps even flawed.
- The terminology _**only** applies to function (procedure) parameters_.
- **Pointers** are an implementation detail and their presence don't say anything about the evaluation of _function parameters_.

## History and Definitions

I've tried to look up the origins of the terms as mentioned above, and there is quite a bit of literature out there from the earlier programming languages.

[The Main Features of CPL (D. W. Barron et al., 1963)][ref-the-main-features-of-cpl]:

> Three modes of parameter call are possible; call by value (which is equivalent to the ALGOL call by value), call by substitution (equivalent to ALGOL call by name), and call by reference. In the latter case, the LH value of the actual parameter is handed over; this corresponds to the "call by simple name" suggested by Strachey and Wilkes (1961).

It is important to note that here the literature talks about _mode of parameter call_. It further distringuishes three _modes_: `call by value`, `call by name` and `call by reference`.

Further literature gives a good, yet technical, definition of these three and a fourth _strategy_ (namely `copy restore`), as published in the [Semantic Models of Parameter Passing (Richard E. Fairly, 1973)][ref-semantic-models-of-parameter-passing]. I've quoted 2 of the 4 definitions below, after which I'll break them down and explain what they mean in more visual terms.

### Call by Value

> [...] Call by Value parameter requires that the actual parameter be evaluated at the time of the procedure call. The memory register associated with the formal parameter is then initialized to this value, and references to the formal parameter in the procedure body are treated as references to the local memory register in which the initial value of the actual parameter was stored. Due to the fact that a copy of the value associated with the actual parameter is copied into the local memory register, transformations on the parameter value within the procedure body are isolated from the actual parameter value. Because of this isolation of values, Call by value can not be used to communicate calculated values back to the calling program.

Roughly, this means that a parameter is, before the function (`procedure`) is called, completely evaluated. The resulting _value_ (from that evaluation), is then assigned to the identifier inside the function (`formal parameter`). In many programming languages this is done by _copying_ the _value_ to a second memory address, making the changes inside the function (`procedure body`) isolated to that function.

In other words: the original memory address' contents (the one used to store the evaluated expression before passing it into the function) can not be changed by code inside the function and changes inside the function to _the value_ are not propagated to the caller.

> ☕ When you order a coffee and someone asks for your name, they might write it down incorrectly. This doesn't affect _your actual name_ and the change is only propagated to the cup.

### Call by Reference

> [...] In Call by Reference, the address (name) of the actual parameter at the time of the procedure call is passed to the procedure as the value to be associated with the corresponding formal parameter. References to the formal parameter in the procedure body result in indirect addressing references through the formal parameter register to the memory register associated with the actual parameter in the calling procedure. Thus, transformations of formal parameter values are immediately transmitted to the calling procedure, because both the actual parameter and the formal parameter refer to the same register.

Roughly, this means that, just like before, the parameter is evaluated, but, unlike before, the _memory address_ (**address / name**) is passed to the function (**procedure**). Changes made to the parameter inside the function (**formal parameter**) are actualy made on the memory address and therefore propagate back to the caller.

> ☕ When you go to a support store for one of your hardware devices and ask for it to be fixed, they might give you a replacement device. This replacement device is still yours, you own it just like before, but it might not be the _exact same one_ you gave to be fixed.

### Reference (and value) types

This is not the complete picture. There is one vital part left that causes _most of the confusion_. Right now I'll explain what a **reference type** is, which has _nothing_ to do with arguments/parameters or function calls.

Reference types and value types are usually explained in the context of how a programming language stores values inside the memory, which also explains why some languages choose to have both, but this entire concept is worthy of (a series of) articles on its own. The [wikipedia page][wiki-reference-type] is, in my opinion, not very informative, but it does refer to various language specs that do go into technical detail.

> A data type is a **value type** if it holds a data value within its own memory space. It means variables of these data types directly contain their values.
>
> Unlike _value types_, a **reference type** doesn't store its value directly. Instead, it stores the address where the value is being stored.

In short, a **reference type** is a type that points to a value somewhere in memory whereas a **value type** is a type that directly points to its value.

> ☕ When you make a payment online, and enter your _bank account number details_, for example your card number, the card itself can not be changed. However, the bank account's balance will be affected. You can see your card as a reference to your balance (and multiple cards can all reference the same balance).
>
> ☕ When you pay offline, that is with cash, the money leaves your wallet. Your wallet holds its own value, just like the cash inside your wallet. The value is directly where the wallet/cash is.

## Show me the code proof

```javascript
function reference_assignment(myRefMaybe) {
  myRefMaybe = { key: 42 }
}

var primitiveValue = 1
var someObject = { is: 'changed?' }

reference_assignment(primitiveValue)
primitiveValue
// => 1

reference_assignment(someObject)
// => { is: 'changed?' }
```

As shown above, `someObject` has not been changed, because it was not a `reference` to `someObject`. In terms of the definitions before: it was not the memory
address of `someObject` that was passed, but a _copy_.

A language that does support `pass by reference` is PHP, but it requires [special syntax][ref-php-reference-pass] to change from _the default of passing by value_:

```php
function change_reference_value(&$actually_a_reference)
{
    $actually_a_reference = $actually_a_reference + 1;
}

$value = 41;
change_reference_value($value);
// => $value equals 42
```

I tried to keep the same sort of semantic as the JS code.

As you can see, the PHP example _actually_ changes the value the input argument _refers_ to. This is because the _memory address_ of `$value` can be accessed by the parameter `$actually_a_reference`.

## What's wrong with the nomenclature?

Reference types and "boxed values" make this more confusing and also why I believe that the nomenclature is perhaps flawed.

The term `call-by-value` is problematic. In JavaScript and Ruby, the **value** that is passed is a **reference**. That means that, indeed, the reference to the boxed primitive is copied, and therefore changing a primitive inside a function doesn't affect the primitive on the outside. That also means that, indeed, the reference to a _reference type_, such as an `Array` or `Object`, is copied and passed as the value.

> Because reference types refer to their value, copying a reference type makes the copy _still_ refer to that value. This is also what you experience as _shallow copy_ instead of _deep copy/clone_.

Whoah. Okay. Here is an example that explores _both these concepts_:

```javascript
function appendOne(list) {
  list.push(1)
}

function replaceWithOne(list) {
  list = []
}

const first = []
const second = []

appendOne(first)
first
// => [1]

replaceWithOne(second)
second
// => []
```

In the first example it outputs `[1]`, because the `push` method modifies the object on which it is called (the object is referenced from the name `list`). This propagates because the `list` argument still refers to the original object `first` (its reference was copied and passed as a value. `list` points to that copy, but points to the same data in memory, because `Object` is a reference type).

In the second example it outputs `[]` because the re-assignment doesn't propagate to the caller. In the end it is not re-assigning the _original reference_ but only a copy.

Here is another way to write this down. 👉🏽 indicates a reference to a different location in memory.
```javascript
first_array   = []
second_array  = []

first     = 👉🏽 first_array
list      = copy(first) = 👉🏽 first_array
list.push = (👉🏽 first_array).push(...)

//        => (👉🏽 first_array) was changed

second    = 👉🏽 second_array
list      = copy(second) = 👉🏽 second_array
replace_array = []
list      = 👉🏽 replace_array

//        => (👉🏽 second_array) was not changed
```

### What about pointers?

C is also always pass by value / call by value, but it allows you to pass a pointer which can simulate pass by reference. Pointers are implementation details, and for example used in C# to enable _pass by reference_.

In C, however, pointers are reference types! The syntax `*pointer` allows you to _follow the pointer to its reference_. In the comments in this code I tried to explain what is going on under the hood.

```c
void modifyParameters(int value, int* pointerA, int* pointerB) {
    // passed by value: only the local parameter is modified
    value = 42;

     // passed by value or "reference", check call site to determine which
    *pointerA = 42;

    // passed by value or "reference", check call site to determine which
    *pointerB = 42;
}

int main() {
    int first = 1;
    int second = 2;
    int random = 100;
    int* third = &random;

    // "first" is passed by value, which is the default
    // "second" is passed by reference by creating a pointer,
    //         the pointer is passed by value, but it is followed when
    //         using *pointerA, and thus this is like passing a reference.
    // "third" is passed by value. However, it's a pointer and that pointer
    //         is followed when using *pointerB, and thus this is like
    //         passing a reference.
    modifyParameters(first, &second, third);

    // "first" is still 1
    // "second" is now 42
    // "random" is now 42
    // "third" is still a pointer to "random" (unchanged)
    return 0;
}
```

## Call by sharing?

The lesser used and known term that was coined is **Call by sharing** which applies to Ruby, JavaScript, Python, Java and so forth. It implies that all values are object, all values are boxed, and they copy a reference when they pass it _as value_. Unfortunately, in literature, the usage of this concept is not concistent, which is also why it's probably less known or used.

For the purpose of this article, call-by-sharing is `call by value`, but the value is always a reference.

## Conclusion

In short: It's always pass by value, but the value of the variable is a reference. All primitive-methods return _a new value_ and thus one can not modify it, all objects and arrays can have methods that modified their value, and thus one _can_ modify it.

You can **not** affect the memory address of the _parameter_ directly in the languages that use `call-by-value`, but you may affect what the parameter refers to. That is, you may affect the memory the parameter points to.

The statement _Primitive Data Types are passed By Value and Objects are passed By Reference._ is **incorrect**.

![Photo of the Centrale Bibliotheek in Rotterdam, The Netherlands: an industrial looking building with metalic walls and various yellow pipes on the side.](../images/articles/javascript-is-not-call-by-reference/outro.jpg "Photo by Boudewijn Huysmans (
https://unsplash.com/@boudewijn_huysmans) on Unsplash (https://unsplash.com/)")


[ref-semantic-models-of-parameter-passing]: http://www.cs.colorado.edu/department/publications/reports/docs/CU-CS-016-73.pdf
[ref-the-main-features-of-cpl]: https://academic.oup.com/comjnl/article/6/2/134/364746
[wiki-evaluation-strategy]: https://en.wikipedia.org/wiki/Evaluation_strategy
[wiki-reference-type]: https://en.wikipedia.org/wiki/Value_type_and_reference_type
[ref-php-reference-pass]: https://www.php.net/manual/en/language.references.pass.php
[blog-source-1]: https://medium.com/nodesimplified/javascript-pass-by-value-and-pass-by-reference-in-javascript-fcf10305aa9c
[blog-source-2]: https://stackoverflow.com/questions/13104494/does-javascript-pass-by-reference
[blog-source-3]: https://hackernoon.com/grasp-by-value-and-by-reference-in-javascript-7ed75efa1293
[blog-source-4]: https://codeburst.io/javascript-passing-by-value-vs-reference-explained-in-plain-english-8d00fd06a47c
[blog-source-5]: https://snook.ca/archives/javascript/javascript_pass
