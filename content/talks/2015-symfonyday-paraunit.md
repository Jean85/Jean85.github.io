---
date: 2015-10-09
title: "Paraunit: Test paralleli, Doctrine e le fixture"
conference: SymfonyDay 2015
conferenceUrl: http://2015.symfonyday.it/#programma
location: Reggio Emilia
slides: 2015-09-paraunit-pugmi
language: it
vimeo: 144861400
joindin: 7bd9d
categories: ["Talks"]
---
Ogni sviluppatore vorrebbe lavorare con una suite di test sempre più grande e con una coverage sempre più alta del proprio codice; ma una suite che impiega troppo tempo a completarsi diventa controproducente.

La soluzione normalmente proposta è quella di eseguire più test in parallelo, ed esistono già alcuni strumenti che lo permettono.
<!--more-->
Quando però si eseguono test funzionali in parallelo, si incontrano sempre problemi di concorrenza nell'accesso al database di test, e i tool attualmente disponibili non riescono ancora a risolvere questo problema; ci siamo quindi spinti ad esplorare nei meandri di Doctrine, per risolvere i problemi di isolamento e concorrenza delle fixture, fino a sviluppare una nostra soluzione a questo annoso problema.
