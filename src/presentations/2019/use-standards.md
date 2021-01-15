---
path: "/presentations/2019/use-standards/"
published_date: "2019-06-11"
modified_date: "2019-06-11"
author: "Derk-Jan Karrenbeld"
author_id: "https://derk-jan.com/schema/Person.jsonld"
title: "Use standards"
description: "(Don't) be smart"
keywords: ["ruby", "rails", "http", "rfcs", "standards", "networking", "caching", "content negotiation"]
languages: ["Ruby"]
license: "CC BY-NC-SA 4.0"
license_url: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
---

<!-- background: rgb(254, 62, 128) -->
<!-- color: #ffe6ee -->

# Use standards

## (Don't) be smart

---

<!-- background: rgb(211, 236, 232) -->
<!-- color: rgb(57, 64, 63) -->

# Delft, University of Technology

writing software together for over 8 years

---

<!-- background: rgb(53, 46, 46) -->
<!-- color: rgb(255, 230, 230) -->

## TrailerVote SDK

In-theatre trailer analytics and mobile re-marketing

**"shazam for trailers"**

---

<!--

    position: relative;
    width: 763px;
    height: 299px;
    display: flex;
    align-items: center;
    justify-content: center;

position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
    pointer-events: none;
    width: 819.494px;
    height: 861px;
    background: linear-gradient(rgba(179, 143, 143, 0.25) 0%, rgba(179, 143, 143, 0) 60%, rgba(0, 0, 0, 0) 100%);
    transform: translateX(-28.2469px) translateY(-281px) rotateZ(-21.3989deg) skewX(23.6011deg) translateY(430.5px) scaleX(0.992678);

-->

<!-- background: white -->
<!-- color: rgb(64, 64, 64) -->

# API server throughput

Serving requests ~35 ms

---

<!-- background: rgb(41, 41, 51) -->
<!-- color: rgb(230, 230, 255) -->

# Daily requests

Over 15 M each weekend-day

---

# Transporting bytes

Over 2.2 TB each weekend-day

---

<!-- background: white -->
<!-- color: rgb(64, 64, 64) -->

# HTTP

---

**H**ypertext **T**ransfer **P**rotocol

---

"...where **hypertext** documents include **hyperlinks** to other _resources_ that the **user** can easily access"

---

# hypertext

"hyper-" from the Greek prefix "ὑπερ-",
meaning **over** or **beyond**

---

# hyperlink

reference to data (such as **hypertext** / **hypermedia**) that can be followed by clicking or tapping

---

# hypermedia

_nonlinear medium_ of information that includes graphics, audio, video, plain text and **hyperlinks**

**example**
The **W**orld **W**ide **W**eb

---

# hypertext != HTML

and **HTTP** is _**not**_ specifically for **browsers***

---

**H**yper**T**ext **M**arkup **L**anguage

---

# HTML

System to annotate documents which are designed to be displayed in a web browser

---

Use **HTML** to build **hypermedia/hypertext** documents that link to other resources using **hyperlinks**. Transmit these using the **H**yper**T**ext **T**ransfer **P**rotocol.

---

**What about...**

- images
- audio
- video
- other non-text content

---

# HTTP transmits metadata

Usually includes the **Media type (MIME type)** of a document

---

# Media Type

> "The data format of a representation is known as a media type [...]"

---

# Media Types

```text
text/html
image/png
application/json
...
```

It defines the format and its interactions

---

# Media Types?

```text
application/vnd.ms-powerpoint
application/graphql
application/vnd.xpbytes.errors.v1+json
```

https://tools.ietf.org/html/rfc6838

> "This document defines procedures for the specification and registration of media types for use in HTTP, MIME, and other Internet protocols."

---

# **R**equest **f**or **C**omments (RFC)

---

# The Internet is specified by RFCs

---

# RFC for everything

- media type (**PNG**): RFC 2083
- media type (**text/html**): RFC 2854
- media type (**application/json**):  RFC 8259
- **HTTP PATCH** method: RFC 5789
- **HTTP** caching: RFC 7234
- **HTTP** authentication: RFC 7235
- ...

---

# RFC for anything

RFC 1121

> This RFC presents a collection of poems that were presented at "Act One", a symposium held partially in celebration of the 20th anniversary of the ARPANET.

---

# RFC for anything

RFC 1925

> This memo documents the fundamental truths of networking for the Internet community.
>
> ...
>
> 2. The Fundamental Truths
>
>    (1)  It Has To Work.

---

# RFC for anything

RFC 1925

> This memo documents the fundamental truths of networking for the Internet community.
>
> ...
>
> (3)  With sufficient thrust, pigs fly just fine.

---

# RFC for anything

RFC 2119

> Key words for use in RFCs to Indicate Requirement Levels
>
> ...
>
> The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

---

# HTTP: Who is it for?

---

# HTTP: Who is it for?

RFC 2068

<pre>
[...] used as a generic protocol for communication between user agent [...]

user agent
      The client which initiates a request. These are often
      **browsers**, **editors**, **spiders** (web-traversing robots), or
      other end user tools.
</pre>

---

# The browser is not the only user

HTTP is not (just) for the browser

---

# HTTP: What is for?

as in: _what does it solve?_

---

# HTTP solves hard problems

- caching (one server, many clients)
- consistency (format, failures, separating data from errors)
- interoperability (between multiple implementations)
- ...

---

<!-- color: rgb(64, 61, 51) -->
<!-- background: rgb(254, 194, 0) -->

# Constraints

(also known as challenges)

- Ruby
- Interoperability
- Amount of users
- Selective synchronisation
- Internationalisation

---

<!-- color: rgb(63, 64, 63) -->
<!-- background: rgb(235, 237, 236) -->

# Ruby Devs

constraint

---

<!-- color: rgb(64, 64, 64) -->
<!-- background: rgb(254, 254, 254) -->

# Ruby Devs

Use rails and write ruby gems

---

<!-- color: rgb(55, 59, 64) -->
<!-- background: rgb(207, 224, 242) -->

# Interoperability

constraint

---

# Interoperability

no versioning

```text
/movies
/images
```

---

# Interoperability

versioning endpoints

```text
/v1/*
/v2/*
```

---

# Interoperability

versioning resources

```text
/movies/v1/*
/images/v2/*
```

---

<!-- background: rgb(251, 50, 97) -->
<!-- color: rgb(255, 230, 235) -->

# Content negotiation

solution for interoperability


https://www.w3.org/Provider/Style/URI.html
Cool URIs don't change

---

# Amount of users

constraint

---

# Amount of users

no scaling

---

# Amount of users

auto scaling

---

<!-- color: rgb(63, 63, 64) -->
<!-- background: rgb(248, 247, 251) -->

# HTTP Caching

solution for amount of users

---

<!-- color: rgb(230, 230, 255) -->
<!-- background: rgb(40, 40, 48) -->

# Selective synchronisation

constraint

---

# Selective synchronisation

daily dumps

- local database
- no diffs

---

# Selective synchronisation

SQL-lite diffs

- local database
- hourly diffs

---

<!-- background: rgb(156, 108, 96) -->
<!-- color: rgb(255, 235, 230) -->

# HTTP cache + small/single resource urls

solution for selective synchronisation

- no database
- diffs determined by **Cache-Control***

---

<!-- background: rgb(24, 30, 30) -->
<!-- color: rgb(230, 255, 255) -->

# Internationalisation

constraint

---

# Internationalisation

Expose all data

---

<!-- color: rgb(255, 230, 230) -->
<!-- background: rgb(53, 46, 46) -->

# Accept-Language header

solution for internationalisation

---

<!-- color: rgb(255, 239, 230) -->
<!-- background: rgb(185, 139, 110) -->

# Emergent futures

---

Use mock API in production whilst building it

---

Use browser to explore data graph (API)

---

Split API over multiple domains without changing client (code)

---

Write crawler to build offline index

---

Data and service migration while running in production

---

Console (CLI) API client

---

Using rough authentication combined with unreachable (and unguessable) urls results in cache-able security

---

# How to do this in Rack/Rails

---


# HTTP Cache-Control and ETag

## Effect
sets Cache-Control
sets Expires
sets ETag

## Which means...
allows for 304 Not Modified responses,
allows for clients to cache resources

## What if...
I use a different field
I have an array
I want to add extra
directives

---

# HTTP Content-Type

## Effect
Parses Content-Type header of request
Reads raw body stream

---

# HTTP Content-Type
 ...with custom media types

## Effect
register :xml symbol
parses application/xml and text/xml into the controller "params"

If you want many of these:

```ruby
gem 'media_types-deserialization'
```

---

HTTP Link

Effect
sets Link header of response

Which means...
also sent with HEAD requests (!)
can be used as prefetch hints or navigation

---

HTTP Accept

Effect
Parses Accept header of request
Sets Content-Type of response

---

HTTP Accept
...with custom media types


If you want to automate some of this:

gem 'media_types'
gem 'media_types-validation'
gem 'media_types-serialization'

---

HTTP Accept-Language

Effect
Parses Accept-Language header of request

Allows for...
returning translated content
returning preferred fallback translation

---

HTTP Accept-Language

Effect
Sets Content-Language header of response


We don't do this, because Content-Language is not the language of the document, but indicates it's intended for speakers of that language.

---

HTTP Accept-Encoding
Because no love for Transfer-Encoding 😢

Effect
Will gzip response if client accepts (understands) gzipped responses
Sets Content-Encoding of response

---

# API consumer recommendations (RFC)

---

Clients MUST be built around media-types

---

Clients SHOULD fallback to html (e.g. Webview), if possible

---

Clients MUST never construct URLs

---

Clients SHOULD turn on / add a HTTP compliant cache

---

# Food for thought

---

Food for thought
AWS is  ̶e̶v̶i̶l̶  expensive

---

Food for thought
one computer is often enough

---

Food for thought
Ruby is fast *(enough)

---

Food for thought
APT packages for deployment are nice

---

Food for thought
Model domains and data as trees

---

Food for thought
Use time-series database for GDPR compliant analytics

---

Food for thought
Convincing cache implementors that their cache is non-compliant is hard

---

Food for thought
Using more resources to seperate short and long lived info is good

---

https://tools.ietf.org/html/draft-ietf-httpbis-bcp56bis-08

This talk as RFC
(questions?)

---

https://xpbytes.com

derk-jan@xpbytes.com (@SleeplessByte)
max@xpbytes.com (@maxmaton)
