### Introduction
This application is a Multiplayer version Conway’s Game of Life.

User can add or delete live cell before game started, and they can also add some predefined cell templates on the grid.

Each user will be assigned a random color on connection with the server.

Dead cells will be given a color that is the average of its neighbors.

Rule Details: https://en.wikipedia.org/wiki/Conway's_Game_of_Life#Examples_of_patterns
### Tech Stack and Choices of technology
`React` for front end

`Redux-saga` for handling side effects in the application

`Node.js` for backend

`SocketIO` for streaming communication between clients and server

`babel` for using ES6 in node

`eslint & prettier` for linting

`husky & lint-staged` for pre-commit hook

`recompose` for composing higher order components (HOC)

`lodash` for utility fucntions

### Getting started
Just start both client and the server and you're good to go!
```
~> cd server
~> yarn
~> yarn start
```
```
~> cd client
~> yarn
~> yarn start
```
then go to  http://localhost:4000/


### TO-DO
write test cases

flexible grid size

refactor code to keep code that balance between DAMP and DRY

add more cell templates

add deployment script

use constant variables for events and predefined template name to avoid typo
