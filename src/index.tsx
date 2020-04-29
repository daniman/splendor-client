import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { Game } from './components/Game';
import { Home } from './components/Home';

import './index.css';

/**
 * - Build a turn log & show some larger number representing the "turn round".
 * - Find some better Card CSS.
 * - Use localStorage to keep track of player's identities so it's not so obvious everyone can act as each other.
 * - Build some pathway so that you're playing as the context of one player, and can't just
 *        take other people's turns for them.
 */

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://splendoor.herokuapp.com/graphql',
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Router>
        <div className="container">
          <Route exact path="/:gameId" component={Game} />
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
