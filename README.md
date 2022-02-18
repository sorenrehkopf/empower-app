# Empower Canvassing App!

This is a simple app to record a universal set of notes about canvassing contacts.

## High-level architecture

This repo is split into a client-side app and a server-side app.

The client is built with react, typescript, and ant design.

The server is built with node, fastify, and sequelize interfacing with mysql.

## Setup

### Server

1. Switch into the server directory and run `yarn (or npm) install`.
2. Install the sequelize-cli globally with `yarn global add sequelize-cli`.
3. Make sure you have mysql running and create a database called 'empower_app'.
4. Run `sequelize db:migrate`.
5. Run `yarn serve`.

The server will be running on localhost:8080 by default.

### Client

1. Switch into the client directory and run `yarn (or npm) install`.
2. Run `yarn start`.

The client will be running at localhost:3000

The client is configured to talk to the server at localhost:8080 when running in development.

## Notes

* I created the client with create-react-app cause I figured it would save time for a quick challenge app like this and I guess it maybe did? But it also did some weird config stuff that I mostly sorted out but there are some artifacts for sure, including the git history for the client.
* I wrote out client side tests but opted to leave them as TODO cause I was running into config issues mentioned above and had already sunk a fair bit of time into this. I did not write out serverside cases for the same time reason, but would have done for the notes controller at least.
* Tried to do a fair bit of cleanup before calling it done, but as it's a petri-dish challenge app there are definitely some patterns I wouldn't necessarily stand by.
