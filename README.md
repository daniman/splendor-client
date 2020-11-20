A React app that provides a light-weight interface for the mechanics of the [Splendor board game](https://en.wikipedia.org/wiki/Splendor_(game)).

This app uses Apollo Client and talks to [this simple GraphQL server](https://github.com/daniman/splendor-server) for its game mechanics and state persistence.

To run the app:
```
$ npm install
$ npm start
```

This app uses TypeScript. the `types.ts` file is machine generated from the GraphQL server created by `splendor-server`. Changes to the GraphQL schema can be reflected in the types file by running:

```
$ npm run codegen:local
```
or
```
$ npm run codegen:prod
```
Depending on whether you want to get the schema from your local development server (typical) or from production.
