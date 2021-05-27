# CompE+ Backend

A REST API that supports the CompE+ [frontend](../www/README.md).

# Setup

Running `npm install` should download almost everything you need to get started.

# Local Development

To start a local development server run `npm run start:dev`. This will automatically pull in new changes as you update files.

To test the code run `npm test`. You can also run `npm run test:watch` for an interactive test session.

We also have a few scripts to keep the code quality up to snuff. Run `npm run format` to format all the code with Prettier and run `npm run lint` to make sure that ESLint doesn't complain about anything.

The API makes use of a number of services e.g., database, blog storage, email. See the [dependencies](#Dependencies) section for more on how to locally emulate these services.

# Logging recipes

```bash
# Verbose logging
VERBOSE=1 npm run start

# Pretty printed logging
npm run start | npx pino-pretty
```

# Deployment

TODO

# Dependencies

## PostgreSQL

The API needs to store its data in PostgreSQL. See [here](./db/README.md) for more details on running a DB locally, executing migrations, and more.

# Scripts

### `npm start`

Runs the compiled app with Node.

### `npm run start:dev`

Runs the app in the development mode. The server will reload if you make edits.

### `npm run build`

Builds the app for production to the `build` folder. Compiles the TypeScript into JavaScript.

### `npm run clean`

Removes the `build` folder.

### `npm test`

Excutes the tests with Jest.

### `npm run test:watch`

Starts an interactive test session with Jest. Tests will automatically re-run as you make edits.

### `npm run format`

Formats all of the source code.

### `npm run lint`

Runs ESLint across the codebase. Does not tolerate linter warnings.

# TODO REMOVE THIS BRAINSTORMING Endpoints

```
GET /users
GET /users/{user}
POST /users/{user}
PUT /users/{user}
DELETE /users/{user} ???

GET /resume-reviews/{resume-re}

```
