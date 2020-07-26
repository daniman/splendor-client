import React from 'react';
import { Helmet } from 'react-helmet';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './modules/makeApolloClient';
import { GameContainer } from './containers/GameContainer';
import { HomeContainer } from './containers/HomeContainer';
import './index.css';

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Helmet>
        <title>Splendoor</title>
      </Helmet>
      <Router>
        <div className="container">
          <Route exact path="/:gameId" component={GameContainer} />
          <Route exact path="/" component={HomeContainer} />
        </div>
      </Router>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
