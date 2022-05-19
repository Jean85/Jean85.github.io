---
date: 2022-05-20
title: "PHP + ES + CQRS + DDD = ? - A planned strategy"
conference: PHPDay 2022
conferenceUrl: https://2022.phpday.it/talks_speakers/#php-es-cqrs-ddd-an-integrated-strategy
location: Verona + online
slides: 2022-phpday-php-ddd-cqrs-es-planned-strategy
language: en
joindin: 3dab6
categories: ["Talks"]
---
DDD, CQRS, Event Sourcing have generated a lot of buzz in recent years, but they seem an unattainable target for the everyday, long running projects we work on. The required amount of knowledge seems unbearable, halting the delivery of business value is not an option, and sticking with the "known ways" of development seems like a safer bet. In reality, all those approaches have so much in common underneath that applying all of them together makes them collimate toward cleaner and suppler code, with a compound effect on the benefits and a reduced overall cost of implementation. 
<!--more-->

In this talk, we will see the action plan that my team designed at the start of this year to try and implement all of this inside an already-running project, going from the most useful tools to keep the implementation in check, to the use of the EventSauce library, starting from a small fraction of the project. From there, we will see that thee attack plan that will lead us, with multiple short iterations, over the process of taking over the "old" code and transforming it into a fully event-sourced DDD application, while still delivering new features.
