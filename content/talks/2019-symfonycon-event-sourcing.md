---
date: 2019-11-21
title: Adding Event Sourcing to an existing PHP project (for the right reasons)
conference: SymfonyCon Amsterdam 2019
conferenceUrl: https://live.symfony.com/2019-amsterdam-con/
location: Amsterdam
slides: 2019-11-event-sourcing-symfonycon
language: en
categories: ["Talks"]
---
*Watch the video of this talk for free on [SymfonyCasts](https://symfonycasts.com/screencast/symfonycon2019/adding-event-sourcing-to-an-existing-php-project-for-the-right-reasons).*

"Event Sourcing", along with "CQRS", have recently become trending terms, and now there is so much theory, blog posts and talks about them.
<!--more-->

However, most of these deal with the problem starting from an utopian assumption: having to write a project from scratch, but at the same time with a high domain complexity right from the start, enough to justify the use of a complex technique like event sourcing and CQRS, which carry a fair amount of inherent complexity. But the reality greatly differs: projects are born from small and simple prototypes, and they accumulate complexity only with time, growth and evolution of specifications and features.

This talk is a case history in which I will tell you (with little theory and a lot of practical examples) how we decided to add event sourcing to an already existing project (without eradicating the rest or rewriting it), to solve a specific problem (reporting and its history) for which this methodology proved to be the perfect solution.
