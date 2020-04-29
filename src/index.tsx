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
