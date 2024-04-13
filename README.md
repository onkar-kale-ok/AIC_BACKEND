# AIC_BACKEND

## Installation

```bash
$ npm init # Initialize your project
$ npm install # Install packages and create package.json file
```

## Database Setup

# Create a new postgres database in your editor

# Add env credentials by taking reference from .env.example file.

## Running the app

````bash
# development
$ npm run start

# watch mode
$ npm run start:dev

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# To create new migration
$ npm run migration:create -- db/migrations/%migration-name%

# TO generate migration after updates or changes
$ npm run migration:generate -- db/migrations/%migration-name%

# TO run generated or pending migrations
$ npm run migration:run

````
