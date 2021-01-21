---
date: 2018-10-19
title: Symfony + Docker, dall'ambiente di sviluppo alla produzione
conference: SymfonyDay 2018
conferenceUrl: https://2018.symfonyday.it/talks.html#alessandro-lai
location: Verona
slides: 2018-10-symfony-docker-symfonyday
language: it
youtube: ULTvEB46f8E
joindin: fd59f
categories: ["Talks"]
---
Docker è una tecnologia che ormai ha preso largamente piede negli ambienti di sviluppo di applicazioni web: da anni ormai è una alternativa superiore alle classiche macchine virtuali, molto più avide di risorse hardware.

Il passaggio però all'ambiente di produzione è stato molto meno ""virale"" e si fatica ancora a trovare risorse e consigli su come portare la propria applicazione in produzione usando Docker e i container. 
<!--more-->

In questo talk vedremo un flusso di continuous integration & delivery che ho perfezionato nell'ultimo anno su diverse applicazioni Symfony: partendo dal comune uso di Docker Compose in locale, ho sfruttato la stessa configurazione nell'ambiente di build per amalgamare al meglio le immagini Docker e le configurazioni, sfruttando diversi accorgimenti ed ottimizzazioni per poi arrivare alle immagini pronte per la produzione; infine vedremo un breve accenno di come ho utilizzato queste immagini sul cluster Kubernetes di produzione. 
