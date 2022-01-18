# Logs Researchproject

## Onderzoek

### Stappenplan

- [x] Onderzoeken welke caching mogelijkheden er zijn.
- [x] Opzetten JS backend die connect via ORM met db
- [x] Testen Backend caching met directives in Apollo GQL
- [x] Testen Backend caching met Redis cache
- [x] Meten resultaten backend
- [x] Opmaken frontend applicatie in Next.js
- [x] Frontend testen met normale fetch
- [x] Frontend testen met Apollo client en cache mogelijkheden
- [x] Frontend testen met Persisted Queries van Apollo client - backend
- [x] Kijken hoe http caching kan gebruikt worden met Persisted Queries (GET)
- [ ] Frontend testen met relay (facebook) ?
- [ ] Frontend testen met localstorage? niet noodzakelijk?
- [ ] Meetresultaten bijhouden
- [ ] GraphCDN testen
- [ ] Mutations toevoegen aan app en kijken wat het efficiëntste is om het complete plaatje te hebben
- [ ] Vergelijking opmaken van de verschillende strategiën

### Metrics

- Response time in backend
- Response time tot in de client
- CPU usage backend?
- RAM usage backend?

### Meet strategie

- Meten op level van nesting (max 4?)
- Meten op data grootte
- Meten op rows op top level

## Caching mogelijkheden

![](https://i.imgur.com/chwlbvw.png)

## Logs

### Backend

#### Bevindingen

##### Node.js - Apollo Sever

| Field, Type caching Apollo Server [**type gql**] | Field, Type caching Apollo Server [plain] | Redis cache |
| ------------------------------------------------ | ----------------------------------------- | ----------- |
| Same as with apollo-server-express               | Found how to implement, check code 🔥     | Done        |

##### Algemeen

- Code-first approach bestaat nog niet met Apollo Server, enkel de SQL-first approach.
- Code-first might work met In-memory cache setup, aangezien dit enkel de responses cached.
- Memcached/Redis setup is een optie.
- Apollo garphql express is een express versie van de apollo gql server package, type-graphql zorgt dat een schema wordt gemaakt volgs classes, hierdoor is het met type-graphql lastiger directives zoals bv max age toe te voegen. In een string file zonder type-graphql gaat dit handiger
- **Redis cache** heeft bij de kleine data range niet veel impact en bij het serializeren van de cahce zijn er problemen met date type en graphql

##### Positief

- Na lang zoeken de resolve field onder de knie gekregen dankzij deze bron: https://frontendmasters.com/courses/advanced-graphql/nested-resolvers-solution/

##### Negatief

- [solved : no reason] Database is zeer traag in relation queries, 10gb versie iets sneller maar niet superveel, data komt wel door via graphql maar toch timeout error ook
- type-graphql voorziet niet bepaald een out of the box aanpak om cahcecontrol directive te plaatsen, de voorbeeld repo is zeer onduidelijk: https://github.com/MichalLytek/type-graphql/tree/master/examples/apollo-cache de source van directives etc is deep nested. **UPDATE => https://typegraphql.com/docs/directives.html** goed bekijken
- Bij **Redis** kan je enkel je database response gaan cachen, niet de gql response aangezien elke request query van een gebruiker anders kan zijn.
- **Database**: heel traag door de grote data, opgelost door indexen toe te voegen op de fk die gebruikt worden in resolvers. Nu veel sneller.

#### Bronnen

### Frontend

#### Bevindingen

##### Algemeen

##### Positief

##### Apollo client

- Zeer snel
- Makkelijk op te zetten
- Handig met useQuery method
- Cached volgens \_\_typename & id => houd per geneste data ook bij & merged wanneer er nieuwe bij komt
- Opletten dat cache niet te veel geheugen inneemt hiermee
- 4 options kwa cache control, zeer makkelijk in gebruik
- **Juistheid van data** er moet aandachtig gekeken worden naar de fetch policy bij mutations, soms kan je erop vertrouwen dat de clien het juist voor jou doet, maar bij deletes moet je zelf de cache updaten en bij een create in sommige gevallen bij geneste data een refetch gaan doen. 

##### Apollo client persisted queries

- Makkelijk op te zetten
- Controleer baar in network tab
- Stuurt niet altijd een GET req ? Soms bij reload enkel posts?
- Werkend gekregen met persisted queries, directive toevoegen werkt. default moet hoger of 0 zijn in index.js server file

##### Apollo client

- Apollo client is makkelijk op te zetten in react
- In apollo client moet de query string direct mee gegeven worden aan gql, en niet eerst via variabele, anders werkt de cache niet
- Goed dev tool in chrome beschikbaar
- Wanneer de cache gebruikt word zie je je data kwasie direct zonder zelf de loader te zien.
- Bij de hooks om data te fetchen heb je direct een error, loading & data destructuring die het heel developper friendly maken.
- Bij een mutation moet het return \_\_typename & id aanwegzig zijn om de client cache te updaten

##### Negatief

##### Apollo client

- Niet atlijd duidelijke documentatie, je moet vaak dingen van op 2 verschillende locaties samen gooien.

#### Bronnen

### CDN

#### Bevindingen

##### Algemeen

- Opzet baar zonder graphcdn, persisted queries maken het mogelijk met GET te werken en deze op eender welke cdn te gaan cachen.
- GraphCDN: portforwarded server met ip werkt niet, moet gehost worden op een dn. Error afkomstig van cloudflare.

##### Positief

- Snel
- Makkelijk op te zetten

##### Negatief

- Site wat buggy? Error count klopt maar geen errors getoond

#### Bronnen

### DB
