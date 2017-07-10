# carousell-reddit

Clone of Reddit/Digg where users can create topics and vote on them.

## Build

To build the source files into `bin/`, first install [Typescript](https://www.typescriptlang.org/), then install the dependencies, then run `npm run build`:

```
npm install -g typescript
npm install
npm run build
```

## Run

To start the server at the default port 3000, install the dependencies then run `npm start`:

```
npm install
npm start
```

## Test

To run the tests, install the dependencies then run `npm test`:

```
npm install
npm test
```

## Develop

This project uses [Typescript](https://www.typescriptlang.org/) for static type-checking during development. The backend server uses the [koa](http://koajs.com/) framework for Node.js. The frontend is built with [Mithril.js](https://mithril.js.org/). Tests run using the [Mocha](https://mochajs.org/) test framework.

### Folder Structure

`src/` contains the source files in Typescript for the server, with the exception of `src/public/` which contains the files for the frontend site, and `src/test/` which contains tests written in Typescript for Mocha. `bin/` contains a mirror of the folder structure in `src/` but with the compiled Javascript files.

```
src
├───docs
├───libs - typescript definitions
├───models
├───public - frontend assets
├───routes
├───test
│   └───mocks
└───utils
```


### Documentation

Documentation is served at `{{server}}/docs`. API documentation is automatically generated from the [Swagger](https://swagger.io/) API specification. All requests and responses are validated against the Swagger and [JSON Schema](http://json-schema.org/) specification in the `src/docs/swagger.yml` file. Other documentation is available in the code as [JSDoc](http://usejsdoc.org/) comments.

### API

API paths begin with `/api/v1` in case there is a need to introduce breaking changes with a `/v2` api but still maintain backward compatibility with `/v1`. For more details on the APIs, please see the documentation at `{{server}}/docs`.

Full list of APIs:

```
GET {{server}}/api/v1/topics
POST {{server}}/api/v1/topics/create
PUT {{server}}/api/v1/topics/{{id}}/vote
```

### Frontend

A simple frontend is provided at `{{server}}/`. The frontend is built using [Mithril.js](https://mithril.js.org/) and connects to the backend server through the API.


## Assumptions

- Server was built with an estimate of traffic on the scale of 10 transactions per minute
- Store was built with an estimate of items stored on the scale of 10 items
- Getting the top 20 list of topics will be called more frequently than creating a new topic, with an estimate of 2 times more frequently
