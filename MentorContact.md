# Contact momenten mentor

## Week 01 - 12/01/2022

### Vragen

* Zijn de parameters die ik zal meten goed of heeft u nog suggesties? (Response time client, server & (CPU & RAM)?)
* Is caching met local-storage testen relevant of hou ik het bij de client-side frameworks
* Is dit een relevant nesting level (4 levels diep)?
* Stel dat ik redis cache de beste oplossing vind, moet ik hiervan een full demo voorzien, met alle CRUD actions? 

### Need to mention

* Caching methodes die ik zal testen per domein.
* Tonen frontend
* Tonen poging 1 apollo cache directives en bevindingen
* Tonen begin redis cache & uitwerking hiervan
* Tonen eerste metingen met redis cache
* Relevantie eerste tests aanhalen door oplossing met indexen op database

### Feedback

* CPU & RAM tonen kan interssant zijn tijdens de demo met reallife tabs open, disclaimer geven ook omdat dit niet super representatief is
* 4 Levels diep is voldoende
* Eens kijken hoe je data fresh houd, maar volledige crud niet nodig per onderdeel
* Gebruik maken van algemene logger (vb. firebase performance logger) om data te verzamelen  


## Week 01 - 19/01/2022

### Vragen

* Moet ik een normale cdn opzetten om dit te tonen of is het aantonen dat ik http caching heb kunnen implementeren voldoende? Als ik dan vb ook kan aantonen dat de s-headers configureerbaar zijn? 
* Ik heb nu vooral gekeken hoe ik deze cachings kan opzetten, maar nog niet hoe ik ze efficient kan gebruiken we input/output, moet ik dit voor elke gevonden manier voor enkel voor de manieren die ik zou aanraden als dev?

### Need to mention

* Client caching werkt 
* Persisted Queries werkt
* HTTP caching werkt

### Feedback