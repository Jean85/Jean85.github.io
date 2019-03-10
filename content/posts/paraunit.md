---
date: "2015-10-09"
draft: false
categories: [Republished]
tags: ["Software Testing", "PHP", "Database", "Open Source", "Symfony", "Doctrine", "MySQL"]
title: "Paraunit: test paralleli, Doctrine e le fixture"

languageCode: "it-IT"
type: post
republished:
  facile: https://engineering.facile.it/blog/ita/paraunit/
---
 *Questo articolo è la sintesi di un talk presentato al [SymfonyDay 2015](http://2015.symfonyday.it/); potete trovare le slide [qui](http://jean85.github.io/slides/2015-10-paraunit-symfonyday/index.html).*

#### I test e la loro durata
Sviluppare applicazioni scrivendo **test** e facendo [Test Driven Development](https://it.wikipedia.org/wiki/Test_driven_development) è un'ottima pratica, e dà parecchie soddisfazioni. Con l'andare del tempo, si fa **crescere la suite di test** del proprio progetto, cercando di aumentarne la copertura e l'efficacia e si scrivono nuovi test corrispondenti alle nuove funzionalità che vengono man mano sviluppate.

L'aumento della quantità di test però porta alla crescita (direttamente proporzionale) del **tempo necessario** ad eseguire i test stessi. 
Nel caso dei **test unitari** questo aumento è spesso trascurabile, poiché **si limitano a caricare una singola classe** e ad analizzarne il comportamento in completo isolamento, terminando la loro esecuzione nel giro di **pochi millisecondi**.

Quando invece parliamo di **test funzionali**, il tempo di esecuzione non è più così limitato: vengono caricate **molte più classi**, spesso viene coinvolto anche il **database**, deve essere messa alla prova l'interazione tra molti elementi; il tutto porta a test la cui durata è talvolta di **quasi un secondo**.

Leggendo libri e blog sull'argomento, e con l'esperienza personale, ho imparato che c'è una **soglia critica** che rappresenta il limite ideale oltre il quale una test suite diventa troppo lenta, e questa soglia è di **circa dieci minuti**.

Ma perché proprio dieci minuti? Il motivo è molto semplice, e pratico: in dieci minuti, il programmatore può fare una pausa, prendersi un caffè o decidere di discutere brevemente una questione tecnica con un collega, e al suo ritorno troverà la suite completata e potrà procedere col lavoro. In caso contrario, possono succedere due cose:

 * il programmatore **rimane a fissare lo schermo** mentre i test si eseguono, dando ragione ai detrattori dei test che affermano che fare TDD è una perdita di tempo;
 * si **smette di eseguire la test suite**, o per lo meno di farla eseguire per intero.

La seconda opzione può sembrare fattibile: si fanno girare solo i **test strettamente necessari** mentre si sviluppa, quelli che vengono scritti in quel momento o che coprono la parte di codice che si sta modificando, per poi eseguire il commit del proprio codice senza far girare l'intera suite.

In realtà **questo approccio fa perdere valore ai test** stessi, perché i test sono codice che non andrà mai in produzione, e che quindi può dare valore ai nostri progetti solo se viene eseguito ogni volta. Inoltre questo approccio nasconde **una trappola**, dato che i test, per essere davvero efficaci, vanno eseguiti tutti ogni volta: la loro forza sta proprio nell'**individuare gli effetti collaterali** imprevisti delle nostre modifiche, i bug che possono presentarsi in punti inaspettati e apparentemente lontani del nostro progetto.

#### Esecuzione parallela dei test
In Facile.it lavoro in un progetto basato su Symfony2 e Doctrine e mi sono trovato proprio davanti a questa problematica: avevamo una **suite di test che stava crescendo** a ritmo sostenuto e che a volte impiegava ad eseguirsi, tra build di preparazione ed esecuzione vera e propria, anche 25 minuti.

Dopo aver ottimizzato le prestazioni del nostro ambiente di sviluppo (passando da Vagrant a Docker, ma questa è un'altra storia), ci siamo resi conto di aver bisogno di una soluzione più drastica al nostro problema, e abbiamo pensato di **eseguire in parallelo i nostri test** per sfruttare al meglio le risorse hardware e ridurre così i tempi di esecuzione.

Dopo un po' di ricerche, abbiamo individuato alcuni tool esistenti che permettevano questo approccio:

 * [brianium/paratest](https://github.com/brianium/paratest)
 * [liuggio/fastest](https://github.com/liuggio/fastest)

Entrambi i tool sono ben sviluppati e semplici da utilizzare e le prime prove sui **test unitari** sono state molto promettenti: grazie alla ridotta dimensione, la loro parallelizzazione è estremamente semplice.

#### I problemi di concorrenza nei test funzionali
Quando siamo passati a provare Paratest sui **test funzionali** abbiamo invece incontrato grossi problemi, che si concretizzavano in **fallimenti casuali durante l'esecuzione parallela**. Questi fallimenti erano dati da un problema molto semplice: stavamo accedendo più volte e in parallelo al nostro database di test.

Ma perché il nostro codice, che è lo stesso che viene eseguito in produzione (dove elabora centinaia, migliaia di richieste al minuto) ha così tanti **problemi di accesso concorrente** nell'ambiente di test? I motivi sono semplici:

 * **i dati di test sono pochi**, mentre in produzione abbiamo tabelle da milioni di righe;
 * per questo motivo **i test tentano di accedere sempre alle stesse righe** del database;
 * la **sequenza** di operazioni di ogni test in genere è **lettura - elaborazione - scrittura**;
 * i test hanno una **rapidità di esecuzione** superiore a quella di un utilizzatore umano.

Tutti questi motivi contribuiscono a creare situazioni in cui **si verificano dei [deadlock](https://it.wikipedia.org/wiki/Deadlock)** e che il nostro database può risolvere solo bloccando uno dei due tentativi di accesso ai dati, facendo così fallire il test corrispondente.

Un altro problema che può verificarsi è l'**alterazione dei dati**: quando due test vengono eseguiti in contemporanea, uno dei due può modificare il database e, così facendo, può far mancare i giusti dati di partenza ad un altro test che si sta avviando nello stesso istante.

Purtroppo **Paratest non offre una soluzione** a questo genere di problemi, mentre Fastest propone come approccio la creazione di un database di test differente per ogni core del proprio processore, per poi eseguire tanti test in parallelo quanti sono i database a disposizione.

Sfortunatamente anche questo approccio non ci ha soddisfatto, in quanto la costruzione del nostro database di test era piuttosto lenta (avevamo molte migration da eseguire e altrettante fixture da caricare ogni volta) e rischiavamo di guadagnare tempo da una parte per perderlo dall'altra, inoltre, avevamo avuto **un'idea nuova**.

### facile-it/paraunit

[![Packagist](https://poser.pugx.org/facile-it/paraunit/version.svg)](https://packagist.org/packages/facile-it/paraunit)
[![Travis build](https://travis-ci.org/facile-it/paraunit.svg)](https://travis-ci.org/facile-it/paraunit)
[![Codeclimate](https://codeclimate.com/github/facile-it/paraunit/badges/gpa.svg)](https://codeclimate.com/github/facile-it/paraunit)
[![Coverage](https://coveralls.io/repos/facile-it/paraunit/badge.svg?branch=master&service=github)](https://coveralls.io/github/facile-it/paraunit?branch=master)

Abbiamo così deciso di sviluppare la nostra soluzione: **[facile-it/paraunit](https://github.com/facile-it/paraunit)**

 * è sviluppato con i **componenti Symfony**;
 * **sa leggere la configurazione XML di PHPUnit** per individuare le test suite;
 * esegue il **parsing e l'aggregazione dei risultati**;
 * grazie ai processi separati, **sa gestire i fatal error** senza far bloccare completamente l'esecuzione;
 * sempre grazie ai processi, riesce ad **ottimizzare l'uso della memoria**;
 * risulta **affidabile** grazie al fatto che basa il suo responso sugli exit code dei singoli processi PHPUnit.

La maggior parte di questi vantaggi sono ovviamente comuni a tutti gli approcci di parallelizzazione dei test, inoltre, grazie al parsing dei risultati, **Paraunit sa riconoscere i casi di fallimento dovuti a deadlock** e riesegue i test che falliscono per questo motivo.

Questo però era solo un primo passo e ovviamente ci siamo concentrati sull'implementare una **soluzione radicale ai problemi di concorrenza**. 

### facile-it/paraunit-testcase

[![Packagist](https://poser.pugx.org/facile-it/paraunit-testcase/version.svg)](https://packagist.org/packages/facile-it/paraunit-testcase)

La soluzione che abbiamo trovato è molto semplice: **le transazioni**.
Per realizzarla nella sua totalità, abbiamo sviluppato un test-case per PHPUnit, rilasciato col pacchetto **[facile-it/paraunit-testcase](https://github.com/facile-it/paraunit-testcase)**; ovviamente il test-case è stato sviluppato in partenza per il nostro caso d'uso, ovvero per il **test di un'applicazione basata su Symfony2 e Doctrine**.

Grazie a questo test-case, ogni test può accedere al database solo dentro una transazione e questa transazione non riceve mai il *commit*, ma sempre il **rollback** al termine. Questo significa che **nulla verrà mai realmente scritto** sul nostro database.

I vantaggi di questo approccio sono molteplici: 

 * **nessun test può interferire** con gli altri, visto che non possono alterare i dati;
 * ogni test può permettersi di **creare al volo un dato o di alterarne uno esistente**, senza doversi preoccupare di ripulire il database al termine, con grande risparmio di tempo nella scrittura dei test;
 * **il database di test rimane sempre pulito** e non dobbiamo più preoccuparci di prepararlo ogni volta che la suite deve essere eseguita, o che eseguiamo un test che può sporcare i dati;
 * anche se non viene mai realmente scritto nulla, **il database esegue comunque le verifiche di integrità**, quali vincoli di unicità o di chiavi esterne;
 * diventa **impossibile avere test interdipendenti**, ovvero test che possono funzionare solo se prima ne vengono eseguiti altri, che modificano in modo ideale i dati di fixture.

L'unico limite di questo approccio è che le transazioni sono disponibili solo con alcuni database e all'interno di Doctrine quindi solo con l'`EntityManager`.

#### La rapidità di esecuzione
Per darvi un'idea di quanto possa essere veloce Paraunit rispetto alla normale esecuzione con PHPUnit, ho misurato il tempo di esecuzione della nostra test suite funzionale, che è sufficientemente ampia (261 classi, 1568 metodi):

![Grafico](/images/paraunit-grafico.png)


Come potete vedere, Paraunit esegue l'intera test suite in soli **6 minuti e 6 secondi**, mentre PHPUnit ci metterebbe **oltre 40 minuti!**

Ho usato il condizionale per un motivo specifico: il tempo di esecuzione di PHPUnit è in realtà una stima (in proiezione lineare) perché, circa al 12% dell'esecuzione, il processo si è chiuso per **esaurimento della memoria** a disposizione, a riprova di un altro dei vantaggi nell'uso di Paraunit.

#### Test coverage in parallelo
Un'altra caratteristica di Paraunit, attualmente in sviluppo, è la possibilità di **parallelizzare l'elaborazione della [coverage](https://phpunit.de/manual/current/en/code-coverage-analysis.html)** dei test.

Questo è possibile grazie all'opzione `--coverage-php` di PHPUnit che salva in un file .php il risultato parziale ottenuto; dopo aver lanciato i singoli test come processi separati, Paraunit esegue l'unione di tutti questi risultati.

#### Sviluppi futuri
Ovviamente questo è solo l'inizio, il primo **rilascio in open source** della nostra soluzione.
Tra gli sviluppi futuri spero di poter realizzare:

 * la **prioritizzazione dei test lenti**, ovvero poter eseguire per primi i test noti per la loro lentezza, così da non rallentare l'esecuzione complessiva della test suite;
 * l'aggiunta di **altre opzioni** di selezione test, come p.e. l'opzione `--group` di PHPUnit;
 * il miglioramento delle **prestazioni** all'avvio dei processi, cosa che pesa molto per i test unitari;
 * il **supporto per altri framework e ORM** oltre a Symfony e Doctrine, creando altri test-case appositi;
 * il miglioramento della funzionalità di test coverage parallela;
 * una soluzione per i database non transazionali, come MongoDB.

Vi invito quindi a partecipare allo sviluppo di Paraunit su [GitHub](https://github.com/facile-it/paraunit), proponendo pull request, aprendo issue per proporre nuove feature o anche semplicemente utilizzandolo per le vostre test suite, così da verificarne l'efficacia e la compatibilità!
