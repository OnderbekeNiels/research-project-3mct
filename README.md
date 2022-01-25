# Research project S5 - 3MCT

## Onderzoeks vraag

### Caching in GraphQL

***Welke is de beste caching strategie bij GraphQL voor een grote relationele database?***

#### Deelvragen

-	Is het mogelijk aan server-side caching in GraphQl te gaan doen in NestJs?
-	Hoe kan ik server-side caching zoals Apollo server dit doet, efficiënt implementeren met NestJs en TypeORM zonder dit in de types te gaan doen?
-	Welke is de beste server-side framework om caching in GraphQL te gaan implementeren?
-	Is het mogelijk code first caching te gaan instellen, schema first kan dit wel met Apollo server.
-	Welke (JS) libraries zijn er om caching te implementeren?
-	Is Quell (een caching solution voor Grapql (zowel client en server-side)) een betrouwbare relevante package/lib?
-	Hoe verkrijg ik nieuwe data wanneer deze veranderde in de database en de cache nog steeds aan staat?
-	Wat zijn de performance voordelen van een CDN tov enkel Server-side caching?
-	Hoe voordeling is het om met een CDN te gaan cachen die enkel GET requests cached, met in gedachte dat GraphQl met POST requests werkt.
-	Hoe zet ik caching voor GraphQl op in een CDN?
-	Is graphcdn.io een relevante CDN en wat zijn de alternatieven?

#### Technisch onderzoek

In dit researchproject zal ik gaan onderzoeken wat de beste caching strategieën zijn voor GraphQL. Dit is iets minder voor de handliggend dan bij een REST API. GraphQL is een vrij recente technologie om een API aan te bieden. Hierdoor zijn zaken zoals caching nog niet in alle front en backend frameworks makkelijk en vanzelfsprekend te implementeren. Ik zal volgende aspecten bekijken en behandelen in mijn onderzoek:

- Welke frameworks zijn het beste te implementeren voor zowel server- als client-side?
- Welke CDN providor is het relevants om met GraphQL te gaan cachen?
- Met welke backend Javascript frameworks is caching developper friendly op te zetten?
- Met welke frontend Javascript frameworks is caching developper friendly op te zetten?
- Wat zijn de voor- en nadelen van de caching strategieën tov elkaar? (Server, Client, CDN)
- Welke caching strategie is het snelste bij grote data queries? (Server, Client, CDN)
- Welke caching strategie is het meest customizeable naar developper needs?
- Welke caching strategie is het goedkoopst?
- Hoe verkrijg ik nieuwe data wanneer deze veranderde in de database en de cache nog steeds aan staat?
- Wat is er mogelijk met Apollo en zonder Apollo bij graphCDN?

Ik zal gebruik maken van volgende technologiën/tools om mijn onderzoek te doen: 

Database: public Stack Overflow data export 50 GB data 2013
Docker
Database Server: https://hub.docker.com/_/microsoft-mssql-server
API: GraphQL
Frontend: React.js

#### Succes criteria

- GraphQL API voor de Stack Overflow relationele database.
- Backend service in een javascript omgeving om de server-side caching te gaan testen.
- Frontend app in React.js om de client-side caching te gaan testen.
- Vergelijking van de caching strategieën met hun voor- en nadelen.
- Performance (snelheid) meet resultaten van grote complexe queries in de verschillende startegiën.
- Handleiding voor zowel client-side en server-side caching te gaan op zetten in de beste gevonden omgeving.
