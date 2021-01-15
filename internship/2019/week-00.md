---
path: "/articles/internship/2019-week-00/"
published_date: "2019-10-09"
modified_date: "2019-10-09"
author: "Derk-Jan Karrenbeld"
author_id: "https://derk-jan.com/schema/Person.jsonld"
title: "Internship 2019: Reading list"
description: "Sharing the internal 2019 internship reading list."
keywords: ["reading list", "internship", "resource", "javascript"]
languages: ["Text"]
license: "CC BY-NC-SA 4.0"
license_url: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
---

During the first half of 2019, [XP Bytes][web-xpbytes] had two interns on the
payroll. This time it were two students from [Techniek College Rotterdam][web-tcr], both studying to become an "Applicatieontwikkelaar" (Software Developer). As a general rule at XP Bytes, before students may accept their position, they have to agree to a few things, among which:

- Reading and summarising at least 4 articles as given by the program manager
- Keep their programming fresh with exercises regarding their internship

If a student is unable or uncomfortable to read in English, which might not be their first language, or a language they're proficient at, we will attempt to provide alternatives in the form of recording or audible content.

Both students graduated with good grades, and it's now time to close the book on past year's projects, which also includes archiving and documenting all the content that came out of this internship. To that end, we will release a series of articles that may aid you during your road to become a developer or may be used as a potential reading list.

![Photo of an open book on a bed, with a bundle of christmas-like lights on top. Caption is "Now I can read in the dark."](https://thepracticaldev.s3.amazonaws.com/i/15xcs0wbnjsb10kzbkrv.jpg "Photo by Nong Vang (https://unsplash.com/@californong) on Unsplash (https://unsplash.com/)")

> Before I list the articles, you should know one more thing. We don't expect the student to understand everything or even grasp all the details. Instead, it's to prepare them on writing technical or semi-technical articles for the weeks to come, as well as trying to get them interested in the various products and aspects of writing software. If you're reading some of these and feel as if you don't know enough, that's okay. I would suggest to read it anyway, and come back to it, once you know more.

## [The Law of Leaky Abstractions][article-law-of-leaky-abstractions]

**11 November 2012**, _11 min read_

This article by Joel Spolsky might be "old", its contents are (still) relevant. The reason we put it on the reading list, is that we often see _incorrect_ or _inconvenient_ abstractions, regardless of the level of the developer. However, It's good to know that abstractions are exactly that: not the concrete reality, and that every abstraction leaks: they are imperfect. And that's okay. This article shows how some well known abstractions are imperfect.

---

## [Why You Need to Build an MVP App <small>(and 5 tips on how to do it)</small>][article-mvp-app]

**13 June 2017**, _9 min read_

{% medium https://medium.com/swlh/why-you-need-to-build-an-mvp-app-and-5-tips-on-how-to-do-it-937d7040ee19 %}

Most of us no longer use [the waterfall model][wiki-waterfall] as our development cycle; we often have _way more_ ideas than time to implement those ideas; we don't know where to start when we're building an app. Building an MVP (minimal viable product) can be a great strategy when tackling issues and challenges surrounding these concepts.

---

## [What the heck is a callback][article-what-is-a-callback]

**12 June 2017**, _5 min read_

{% medium https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced %}

In JavaScript, functions can be passed around as values. Sometimes code doesn't execute in-line (synchronously), but rather concurrently (asynchronously). When an asynchronous task finishes, we often want to be notified and execute some code. This article talks about what callbacks are, what they look like, and how or when you could need and use them.

---

## [JavaScript Event Loop Explains][article-event-loop]

**27 December 2017**, _4 min read_

{% medium https://medium.com/front-end-weekly/javascript-event-loop-explained-4cd26af121d4 %}

A lot of JavaScript is used in browsers, and browsers do more than just executing JavaScript. JavaScript has various tools to _schedule_ work or to listen for events (such as mouse clicks) and execute work once these occur. How this ties into _responsiveness (vs freezing)_, and when scheduled calls are executed, is explained using the JavaScript "Orchestrator": The Event Loop.

---

## [Web fonts: when you need them, when you don’t][article-web-fonts]

**13 August 2017**, _17 min read_

{% medium https://medium.com/hackernoon/web-fonts-when-you-need-them-when-you-dont-a3b4b39fe0ae %}

Our interns and juniors often know what fonts are and that you can use certain ones via CSS on web pages. Sometimes they also know about services such as [Google's web fonts][web-google-webfont]. It usually comes as a shocker when one of us tells them about all the issue, limitations and challenges that come with using web fonts. This article is a good summary of our decision tree for using or not using web fonts.

---

## [Building the Google Photos Web UI][article-google-photos-ui]

**10 July 2018**, _27 min read_

{% medium https://medium.com/google-design/google-photos-45b714dfbed1 %}

If you use [Google Photos][web-google-photos] you might have noticed _how well_ it scrolls, and how nicely it can zoom in and out. Sometimes our interns need to build an app that can display thousands of items of data. We _don't_ expect them to be able to optimise that, but we do want to give them some sense in what went into it at the tech giant Google. Hopefully they (and you) find this as intruiging as we find it. It's not meant as a tutorial, but definitely should be a good and interesting read.

---

## [API Versioning Has No "Right Way"][article-api-versioning]

**26 September 2017**, _8 min read_

Naming things is hard, versioning is harder, or so I personally like to say. Especially for those interns and juniors that will work on or build an API, we like to give them this article first, before they dive into the way we have implemented API versioning in our system. Additionally, if it makes sense, we send them over to [read this article][slides-api-stripe] about Stripe's API and their versioning.

---

## [Web Architecture 101][article-web-architecture]

**7 November 2017**, _11 min read_

{% medium https://engineering.videoblocks.com/web-architecture-101-a3224e126947 %}

The subtitle is "The basic architecture concepts I wish I knew when I was getting started as a web developer" and I think that pretty much sums up why we recommend this article. It's mostly a nice glossary and explanation of certain concepts you'll need to think about when building on and for the web.

---

## [How to visually design state in JavaScript][article-visual-state]

**20 July 2018**, _15 min read_

The reason this article is on the list is that we want our juniors to get a bit more comfortable with graph theory. Its core contents is actually not about JavaScript at all, but expresses pretty well how we like to design on paper whenever we have to deal with states and their transitions.

---

## [The ultimate guide to proper use of animation in UX][article-ux-animation-guide]

**5 September 2018**, _11 min read_

{% medium https://uxdesign.cc/the-ultimate-guide-to-proper-use-of-animation-in-ux-10bd98614fa9 %}

I personally don't agree that this is _thé ultimate guide_, but it certainly is comprehensive, and most of all crystal clear. The animations itself are executed perfectly, conveying exactly what they intend to convey. Animation is not necessarily hard, but it's easy to try to slap on animation. This guide gives great guidelines and rules when it comes to using animation to benefit UX instead of just using animation.

---

## [Everything you need to know about skeleton screens][article-ui-skeleton]

**19 October 2018**, _14 min read_

{% medium https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a %}

Skeleton screens are powerful and research shows that they can help reducing the perceived load time of any application (Web or not). This article is a good in-depth resource about that exact research, the different ways to accomplish adding a skeleton screen and what exactly should be on it / in it.

---

## [Animation principles for UX and UI designers][article-animation-that-matters]

**13 December 2018**, _11 min read_

{% medium https://uxplanet.org/animation-that-matters-adding-value-to-your-interface-65496fe4c182 %}

Whereas the "ultimate guide" is an amazing "rules and guidelines" article, this particular entry of our recommended reading list talks about the _properties_ of animation and _concepts_ on a bit more abstract level. In other words, if you work with these concepts in mind, you hopefully don't need the guidelines at all.

![Photo with the caption 'The urban life in Rotterdam is great to capture. Amazing buildings and a lot of people make great stories together. A lovely city for photography.', displaying a yellow bridge with high walls that connects Rotterdam's city centre with the old Nord neighbourhood, in Rotterdam, The Netherlands](https://thepracticaldev.s3.amazonaws.com/i/e1ak0qorqm2txflfxv2k.jpg "Photo by Marc Kleen (https://unsplash.com/@marckleen) on Unsplash (https://unsplash.com/)")

The reading list is not the final list of resources our interns used this year
and we'll be releasing more resources as time passes, as part of a series.

[article-animation-that-matters]: https://uxplanet.org/animation-that-matters-adding-value-to-your-interface-65496fe4c182
[article-api-versioning]: https://apisyouwonthate.com/blog/api-versioning-has-no-right-way
[article-event-loop]: https://medium.com/front-end-weekly/javascript-event-loop-explained-4cd26af121d4
[article-google-photos-ui]: https://medium.com/google-design/google-photos-45b714dfbed1
[article-law-of-leaky-abstractions]: https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/
[article-mvp-app]: https://medium.com/swlh/why-you-need-to-build-an-mvp-app-and-5-tips-on-how-to-do-it-937d7040ee19
[article-visual-state]: https://www.freecodecamp.org/news/how-to-visually-design-state-in-javascript-3a6a1aadab2b/
[article-web-architecture]: https://engineering.videoblocks.com/web-architecture-101-a3224e126947
[article-web-fonts]: https://medium.com/hackernoon/web-fonts-when-you-need-them-when-you-dont-a3b4b39fe0ae
[article-what-is-a-callback]: https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced
[article-ui-skeleton]: https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a
[article-ux-animation-guide]: https://uxdesign.cc/the-ultimate-guide-to-proper-use-of-animation-in-ux-10bd98614fa9

[slides-api-stripe]: https://stripe.com/gb/blog/api-versioning
[web-google-photos]: https://photos.google.com/
[web-google-webfont]: https://fonts.google.com/
[web-tcr]: https://www.techniekcollegerotterdam.nl
[web-xpbytes]: https://xpbytes.com
[wiki-waterfall]: https://en.wikipedia.org/wiki/Waterfall_model
