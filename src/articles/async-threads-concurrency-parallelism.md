---
path: "/articles/async-threads-concurrency-parallelism/"
published_date: "2019-05-23"
modified_date: "2019-06-03"
author: "Derk-Jan Karrenbeld"
author_id: "https://derk-jan.com/schema/Person.jsonld"
title: "Why there is no-such thing as a multi-threading issue in JavaScript."
description: "Exploring the differences between Async, Thread, Concurrency and Parallelism, applied to JavaScript."
keywords: ["javascript", "concurrency", "thread", "async"]
languages: ["JavaScript"]
license: "CC BY-NC-SA 4.0"
license_url: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
---

> Data is sent between workers and the main thread via a system of messages —
> both sides send their messages using the postMessage() method, and respond to
> messages via the onmessage event handler (the message is contained within the
> Message event's data attribute.) The data is copied rather than shared.

https://blog.logrocket.com/node-js-multithreading-what-are-worker-threads-and-why-do-they-matter-48ab102f8b10/
https://www.htmlgoodies.com/html5/tutorials/introducing-html-5-web-workers-bringing-multi-threading-to-javascript.html
https://www.tutorialspoint.com/major-issues-with-multi-threaded-programs
https://austingwalters.com/multithreading-common-pitfalls/
https://softwareengineering.stackexchange.com/questions/81003/how-to-explain-why-multi-threading-is-difficult
https://www.quora.com/Why-is-multi-threading-so-damn-hard
https://smartbear.com/blog/test-and-monitor/why-johnny-cant-write-multithreaded-programs/
https://stackoverflow.com/questions/39879/why-doesnt-javascript-support-multithreading
https://codeburst.io/why-web-workers-make-javascript-more-than-a-single-thread-3d489ffad502
