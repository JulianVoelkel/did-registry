# did-registry

## Prerequisities

* Node.js
* Docker & Docker Compose


## Running via Docker

To start the local Ganache Network and the did-registry application run:

```
docker-compose up -d
```

The application will be available at: ```http://localhost:4400```.

A Swagger API Documentation is available at: ```http://localhost:4400/api-docs```

to access the application logs via terminal run: 

```
docker-compose up
```

to completely stop and remove the application run: 

```
docker-compose down -v
```

## Roles

* Issuing Authority (Registers the physicalID and the aktDID)
    * address: 0x5AEDA56215b167893e80B4fE645BA6d5Bab767DE
    * deployer of the ValidationContract

* Manufacturer (Registers the DeviceDID using the physicalID and the aktDID)
    * address: 0x6330A553Fc93768F612722BB8c2eC78aC90B3bbc
    * deployer of the RegistryContract


## Running the Scenario (Postman)

To run the testing scenario import the provided postman environment and collection under ```/test/postman/```.

Then just execute the collections requests. 

1. createAktDID
2. registerPID
3. registerDevice
4. getDIDDocument



