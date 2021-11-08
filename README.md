# Research project S5 - 3MCT

## Onderzoeks vraag

### Caching in GraphQL

intro: Onderzoek de beste aanpak om je GraphQL API te cachen. Denk aan de verschillende soorten caching. Onderzoek ook in hoeverre GraphCDN dit voor jou kan doen. Je kan ook eens kijken naar zaken die hier in mindere mate aan gerelateerd zijn; rate-limiting, throttling, etc. (typische uitwerkingen die je nodig hebt als je in een productieomgeving komt).

Mogelijke databases:
 - https://data-xtractor.com/blog/data-modeling/test-databases/#Bank_Test_Database
 - Artemis db uit het eerste jaar

**handige link: https://www.apollographql.com/blog/backend/caching/graphql-caching-the-elephant-in-the-room/**

- wat ga je concreet maken?
    GraphQL API in NestJs met de <naam db> dataset. Deze API zal ik gaan voorzien met de mogelijke Caching mogelijkheden met GraphQL. Deze dataset bevat geneste data en is dus handig om grote & verschillende API responses te gaan meten/testen.


- wat is het nieuwe element (research)? Kies iets dat actueel in jouw domein is.
    Onderzoeken hoe je het beste gaat gaan cachen met een GraphQL API in NestJs
    - HTTP caching
    - Clientside caching
    - Serverside caching
    - Performance gaan onderzoeken van de verschillende soorten caching en het verschil van caching en zonder caching

- welke technologie zal je gebruiken?
    - backend: GraphQL API in NestJs
    - database: MySQL in Maria db
    - docker container 

**Onderzoeksvraag: Welke is de beste caching strategie met GraphQL voor een grote relationele database.**

