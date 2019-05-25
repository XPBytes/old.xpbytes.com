---
path: "/articles/control-flow-in-reduce-inject-ruby/"
published_date: "2019-05-23"
modified_date: "2019-05-24"
author: "Derk-Jan Karrenbeld"
author_id: "https://derk-jan.com/schema/Person.jsonld"
title: "Control flow in reduce/inject"
description: "On how to skip items, conditionally apply logic and how to break or stop iteration early when using reduce/inject in Ruby."
keywords: ["ruby", "reduce", "map-reduce", "control flow"]
languages: ["Ruby"]
license: "CC BY-NC-SA 4.0"
license_url: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
---

[`reduce`][ref-reduce] ([`inject`][ref-inject]) is one of the most powerful
methods that exists on the [Enumerable][ref-enumerable] module, meaning that the
methods are available on any instances of any class that includes this module,
including [Array][ref-array], [Hash][ref-hash], [Set][ref-set] and
[Range][ref-range].

[`reduce`][ref-reduce] can be used in a [MapReduce][wiki-map-reduce] process,
often is the base for comprehensions and is a great way to group values or
calculate a single value (_reducing a set of values to a single value_) given a
set of values.

This article quickly shows you how to skip values / conditionally return values
during a [`reduce`][ref-reduce] iteration and how to break early / return a
different value and stop iteration.

![Bridge In The Mist in Stockholm, Sweden](../images/articles/control-flow-in-reduce-inject-ruby/intro.jpg "Photo by Anders Jildén (https://unsplash.com/@andersjilden) on Unsplash (https://unsplash.com/)")

## Recap 💬

From the documentation, given an instance `enum` (an **Enumerable**) calling
`enum.reduce`:

```ruby
# Combines all elements of <i>enum</i> by applying a binary
# operation, specified by a block or a symbol that names a
# method or operator.
```

An example of using [`reduce`][ref-reduce] would be write a function that sums
all the elements in a collection:

```ruby
##
# Sums each item in the enumerable (naive)
#
# @param [Enumerable] enum the enumeration of items to sum
# @return [Numeric] the sum
#
def summation(enum)
  sum = 0
  enum.each do |item|
    sum += item
  end
  sum
end

##
# Sums each item in the enumerable (reduce block)
#
# Each iteration the result of the block is the passed in previous_result.
#
# @param [Enumerable] enum the enumeration of items to sum
# @return [Numeric] the sum
#
def summation(enum)
  enum.reduce do |previous_result, item|
    previous_result + item
  end
end

##
# Sums each item in the enumerable (reduce method)
#
# Each iteration the :+ symbol is sent as a message to the current result with
# the next value as argument. The result is the new current result.
#
# @param [Enumerable] enum the enumeration of items to sum
# @return [Numeric] the sum
#
def summation(enum)
  enum.reduce(:+)
end

##
# Alias for enum.sum
#
def summation(enum)
  enum.sum
end
```

[`reduce`][ref-reduce] takes an optional initial value, which is used instead of
the first item of the collection, when given.

## How to control the flow?

When working with [`reduce`][ref-reduce] you might find yourself in one of two
situations:

- you want to conditionally return a different value for the iteration (which is
  used as base value for the next iteration)
- you want to break out early (stop iteration altogether)

### next ⏭

The `next` keyword allows you to return early from a `yield` block, which is the
case for any enumeration.

Let’s say you the sum of a set of numbers, but want **half** of any **even**
number, and **double** of any **odd** number:

```ruby
def halfly_even_doubly_odd(enum)
  enum.reduce(0) do |result, i|
    result + i * (i.even? ? 0.5 : 2)
  end
end
```

Not too bad. But now another business requirement comes in to skip any number
under 5:

```ruby
def halfly_even_doubly_odd(enum)
  enum.reduce(0) do |result, i|
    if i < 5
      result
    else
      result + i * (i.even? ? 0.5 : 2)
    end
  end
end
```

Ugh. That’s not very nice ruby code. Using `next` it could look like:

```ruby
def halfly_even_doubly_odd(enum)
  enum.reduce(0) do |result, i|
    next result if i < 5
    next result + i * 0.5 if i.even?
    result + i * 2
  end
end
```

`next` works in any enumeration, so if you’re just processing items using
`.each` , you can use it too:

```ruby
(1..10).each do |num|
  next if num.odd?
  puts num
end
# 2
# 4
# 6
# 8
# 10
# => 1..10
```

### break 🛑

Instead of skipping to the next item, you can completely stop iteration of a an
enumerator using `break`.

If we have the same business requirements as before, but we have to return the
number **42** if the item is _exactly 7_, this is what it would look like:

```ruby
def halfly_even_doubly_odd(enum)
  enum.reduce(0) do |result, i|
    break 42 if i == 7
    next result if i < 5
    next result + i * 0.5 if i.even?
    result + i * 2
  end
end
```

Again, this works in any loop. So if you’re using find to try to [`find`][ref-find]
an item in your enumeration and want to _change the `return` value_ of that
`find`, you can do so using `break`:

```ruby
def find_my_red_item(enum)
  enum.find do |item|
    break item.name if item.color == 'red'
  end
end

find_my_red_item([
  { name: "umbrella", color: "black" },
  { name: "shoe", color: "red" },
  { name: "pen", color: "blue" }
])
# => 'shoe'
```

### StopIteration

You might have heard about or seen [`raise StopIteration`][ref-stop-iteration].
It is a special exception that you can use to stop iteration of an enumeration,
as it is caught be [`Kernel#loop`][ref-loop], but its use-cases are limited as
you should not try to control flow using `raise` or [`fail`][ref-fail]. The
[airbrake blog][blog-airbrake] has a [good article][blog-airbrake] about this
use case.

## When to use reduce

If you need a guideline when to use [`reduce`][ref-reduce], look no further. I
use the four rules to determine if I need to use [`reduce`][ref-reduce] or
[`each_with_object`][ref-each-with-object] or something else.

I use [`reduce`][ref-reduce] when:

- _reducing_ a collection of values to a **smaller** result (e.g. 1 value)
- _grouping_ a collection of values (use [`group_by`][ref-group-by] if possible)
- _changing_ immutable primitives / value objects (returning a new value)
- you need a _new value_ (e.g. new [Array][ref-array] or [Hash][ref-hash])

### Alternatives 🔀

When the use case does not match the guidelines above, most of the time I
actually need [`each_with_object`][ref-each-with-object] which has a similar
signature, but does not build a new value based on the `return` value of a block,
but instead iterates the collection with a predefined “object”, making it much
easier to use logic inside the block:

```ruby
doubles = (1..10).each_with_object([]) do |num, result|
  result << num* 2
  # same as result.push(num * 2)
end
# => [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

doubles_over_ten = (1..10).each_with_object([]) do |num, result|
  result << num * 2 if num > 5
end
# => [12, 14, 16, 18, 20]
```

Use [`each_with_object`][ref-each-with-object] when:

- building a new container (e.g. [Array][ref-array] or [Hash][ref-hash]).
  **Note** that you’re not really _reducing_ the current collection to a
  _smaller_ result, but instead conditionally or unconditionally _map_ values.
- you want logic in your block without repeating the result value (because you
  _must_ provide a return value when using [`reduce`][reduce])

## My use case

The reason I looked into control flow using reduce is because I was iteration
through a list of value object that represented a migration. Without using
[`lazy`][ref-lazy], I wanted an elegant way of representing when these
migrations should run, so used a semantic version. The migrations enumerable is
a sorted list of migrations with a semantic version attached.

```ruby
migrations.reduce(input) do |migrated, (version, migration)|
  migrated = migration.call(migrated)
  next migrated unless current_version.in_range?(version)
  break migrated
end
```

The function `in_range?` determines if a migration is executed, based on the
current “input” version, and the semantic version of the migration. This will
execute migrations until the “current” version becomes in-range, at which point
it should execute the final migration and stop.

The alternatives were less favourable:

- [`take_while`][ref-take-while], [`select`][ref-select] and friends are able to
  _filter_ the list, but it requires multiple iterations of the migrations
  collection (filter, then “execute”);
- [`find`][ref-find] would be a good candidate, but I needed to change the input
  so that would require me to have a bookkeeping variable keeping track of
  “migrated”. Bookkeeping variables are almost never necessary in Ruby.

![Photo called "It’s Own Kind of Tranquility", displaying a series of windmills on either side of a 'water street (canal)' in Alblasserdam, The Netherlands](../images/articles/control-flow-in-reduce-inject-ruby/outro.jpg "Photo by Vishwas Katti (https://unsplash.com/@vishkatti) on Unsplash (https://unsplash.com/)")

[ref-reduce]: https://ruby-doc.org/core/Enumerable.html#method-i-reduce
[ref-inject]: https://ruby-doc.org/core/Enumerable.html#method-i-inject
[ref-enumerable]: https://ruby-doc.org/core/Enumerable.html
[ref-array]: https://ruby-doc.org/core/Array.html
[ref-hash]: https://ruby-doc.org/core/Hash.html
[ref-range]: https://ruby-doc.org/core/Range.html
[ref-set]: https://ruby-doc.org/stdlib/libdoc/set/rdoc/Set.html
[ref-find]: https://ruby-doc.org/core/Enumerable.html#method-i-find
[ref-stop-iteration]: https://ruby-doc.org/core/StopIteration.html
[ref-loop]: https://ruby-doc.org/core/Kernel.html#method-i-loop
[ref-fail]: https://ruby-doc.org/core/Kernel.html#method-i-fail
[ref-each-with-object]: https://ruby-doc.org/core/Enumerable.html#method-i-each_with_object
[ref-group-by]: https://ruby-doc.org/core/Enumerable.html#method-i-group_by
[ref-take-while]: https://ruby-doc.org/core/Enumerable.html#method-i-take_while
[ref-select]: https://ruby-doc.org/core/Enumerable.html#method-i-select
[wiki-map-reduce]: https://en.wikipedia.org/wiki/MapReduce
[blog-airbrake]: https://airbrake.io/blog/ruby-exception-handling/stopiteration

## Reference

- [Array][ref-array]
- [Enumerable][ref-enumerable]
- [Enumerable#`each_with_object`][ref-each-with-object]
- [Enumerable#`find`][ref-find]
- [Enumerable#`group_by`][ref-group-by]
- [Enumerable#`inject`][ref-inject]
- [Enumerable#`reduce`][ref-reduce]
- [Enumerable#`select`][ref-select]
- [Enumerable#`take_while`][ref-take-while]
- [Hash][ref-hash]
- [Kernel#`fail`][ref-fail]
- [Kernel#`loop`][ref-loop]
- [Range][ref-range]
- [Set][ref-set]
- [StopIteration][ref-stop-iteration]

