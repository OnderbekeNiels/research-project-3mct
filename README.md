# Research project S5 - 3MCT

## Onderzoeks vragen

### Svelte

intro: Svelte schept graag op over de minimalistische aanpak door de afwezigheid van een virtual DOM library. Maak een use-case en doe (diepgaand) onderzoek naar de painting, rendering, loading, layout, etc. en bekijk of je echt beter af bent met Svelte. Voor de start van deze vraag kan een gesprek met Martijn nuttig zijn.

- wat ga je concreet maken? ("ik zal een een app bouwen in technologie x" is te vaag)
- wat is het nieuwe element (research)? Kies iets dat actueel in jouw domein is.
- welke technologie zal je gebruiken?  (frontend/backend/...)  

### Caching in GraphQL

intro: Onderzoek de beste aanpak om je GraphQL API te cachen. Denk aan de verschillende soorten caching. Onderzoek ook in hoeverre GraphCDN dit voor jou kan doen. Je kan ook eens kijken naar zaken die hier in mindere mate aan gerelateerd zijn; rate-limiting, throttling, etc. (typische uitwerkingen die je nodig hebt als je in een productieomgeving komt).

- wat ga je concreet maken?
    GraphQL API met minstens 1 many to many relatie om grondig te kunnen gaan testen. 
    Het zal een backend oplossing zijn een wielerwedstrijdorganisatie die wedstrijden wil gaan weergeven, deze kan en zal veel data bevatten.
    Met voldoende data en relaties is het mogelijke verschillende grotes van responses te gaan testen en meten.

    tabellen:
    - categories
    - races
    - desciplines

- wat is het nieuwe element (research)? Kies iets dat actueel in jouw domein is.
    Onderzoeken hoe je het beste gaat gaan cachen met een GraphQL API
    - Clientside caching
    - Serverside caching
    - Performance gaan onderzoeken van de verschillende soorten caching en het verschil van caching en zonder caching

- welke technologie zal je gebruiken?
    - backend: GraphQL API
    - database: MySQL in Maria db
    - docker container 

**Onderzoeksvraag: Hoe kan ik het beste gaan cachen (Server & Client side) met GraphQL API en MySQL DB voor een wielerwedstrijd API. Welke performance impact hebben deze soorten caching bij veel requests?**

### BACKUP choice:

#### Wat is de status van Rust voor het bouwen van Web Applicaties

intro: Rust is een taal die veel mensen zien als de opvolger van C/C++. Naast het gebruik in systeem programming zoals operating systems is het ook mogelijk om Rust te gebruiken voor het bouwen van web applicaties. De bedoeling van deze onderzoeksvraag is te kijken hoever deze technologie staat. Kan je een web app of API bouwen in Rust. Hoe zit het met dataaccess en security. Kan je deze applicatie vlot deployen en hosten.

