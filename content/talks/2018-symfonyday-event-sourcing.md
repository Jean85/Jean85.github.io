---
date: 2018-10-19
title: Adding Event Sourcing to an existing PHP project (for the right reasons)
conference: SymfonyDay 2018
conferenceUrl: https://2018.symfonyday.it/talks.html#alessandro-lai
location: Verona
slides: 2018-10-event-sourcing-symfonyday
language: it
youtube: qKn5LRAnchc
joindin: de1e0
categories: ["Talks"]
---
"Event Sourcing", along with "CQRS" (Command Query Responsibility Segregation), have recently become trending terms, and now there is so much theory, blog posts and talks about them. 

However, most of these deal with the problem starting from an utopian assumption: having to write a project from scratch (greenfield), but at the same time with a high domain complexity right from the start, enough to justify the use of a complex technique like event sourcing and CQRS, which carry a fair amount of inherent complexity. 
<!--more-->

But the reality greatly differs: projects are born from small and simple prototypes, and they accumulate complexity only with time and the growth and evolution of specifications and features. 

This talk is a case history in which I will tell you (with little theory and a lot of practical examples) how we decided to add event sourcing to an already existing project (without eradicating the rest or rewriting it), to solve a specific problem (reporting and its historization) for which this methodology proved to be the perfect solution. 
