# Logs Researchproject

## Onderzoek

### Stappenplan

- [x] Onderzoeken welke caching mogelijkheden er zijn.
- [x] Opzetten JS backend die connect via ORM met db
- [x] Testen Backend caching met directives in Apollo GQL **! NOT DONE**
- [ ] Testen Backend caching met Redis cache **WIP**
- [x] Meten resultaten backend
- [x] Opmaken frontend applicatie in Next.js
- [x] Frontend testen met normale fetch
- [ ] Frontend testen met Apollo client en cache mogelijkheden
- [ ] Frontend testen met Persisted Queries van Apollo client - backend
- [ ] Kijken hoe http caching kan gebruikt worden met Persisted Queries (GET)
- [ ] Frontend testen met relay (facebook)
- [ ] Frontend testen met localstorage? niet noodzakelijk?
- [ ] Meetresultaten bijhouden
- [ ] GraphCDN testen

### Metrics
* Response time in backend
* Response time tot in de client
* CPU usage backend?
* RAM usage backend? 

### Meet strategie
* Meten op level van nesting (max 4?)
* Meten op data grootte
* Meten op rows op top level

## Caching mogelijkheden

![](https://i.imgur.com/chwlbvw.png)


## Logs

### Backend
#### Bevindingen


##### Node.js - Apollo Sever

| Field, Type caching Apollo Server [**type gql**] | Field, Type caching Apollo Server [plain] | Redis cache |
| -------- | -------- | -------- |
| Not able to add right directives like apollo server plain way. | Did it like docs, no working result yet | To do


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
##### Negatief
#### Bronnen
### CDN
#### Bevindingen
##### Algemeen
##### Positief
##### Negatief
#### Bronnen
### DB