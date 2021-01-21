---
date: 2019-10-18
title: "Symfony ❤︎ Kubernetes: dynamic feature-review environments"
conference: SFDay 2019
conferenceUrl: https://2019.sfday.it/talks.html
location: Verona
slides: 2019-10-symfony-loves-k8s-sfday
language: en
youtube: CfbqEnrKxN0
joindin: 910a4
categories: ["Talks"]
---
Docker has been a part of our development environments for long as of now. But its usage in production had not followed the same adoption curve, and it's instead rising only in the last years, mainly due to Kubernetes. 

<!--more-->
But Kubernetes is not only a simple tool to port your containers into production, it goes beyond that! It lets (and forces) us developer embrace the twelve-factor approach, creating real cloud-native applications, where everything is parametrized and properly isolated. In this talk we'll see how a Symfony application can be easily packaged, parametrized and deployed using Docker, Kubernetes and Helm, up to the point of having one-click deployments of per-branch environments, a tool that makes review/QA of a feature really fast & easy. 
