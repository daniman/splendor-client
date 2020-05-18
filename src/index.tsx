import React from 'react';
import { Helmet } from 'react-helmet';
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
    uri: document.location.host.indexOf('localhost') === -1 ?
    'https://splendoor.herokuapp.com/graphql' : 
    'http://localhost:4000',
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Helmet>
        <title>Splendor</title>
      </Helmet>
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
