import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';

import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

// pick appropriate GraphQL server based on context
const host = document.location.hostname;
const gql_server = host.indexOf('splendoor.netlify.app') === -1
  ? `//${host}:4000`
  : 'https://splendoor.herokuapp.com/graphql';

// create an http link:
const httpLink = new HttpLink({ uri: gql_server });

// create a websocket link
const protocol = host.indexOf('splendoor.netlify.app') === -1 ? 'ws' : 'wss';
const wsLink = new WebSocketLink({
  uri: `${protocol}://${host}:4000/graphql`,
  options: {
    reconnect: true
  }
});

const link = split( // split the link based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export default client;
