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

