/* This container deals with running the initial LOBBY_QUERY for the game board
 * and then *subscribes* to updates to that query
 * The results of the query are passed straight through to the underlying Game
 * component which deals with rendering the results.
 */

import React from 'react';
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { Game } from '../components/Game';
import { LOBBY_QUERY } from '../gql/queries';
import { LOBBY_SUBSCRIPTION } from '../gql/subscriptions';

import * as Types from '../types';

export const GameContainer: React.FC= () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { subscribeToMore, data, loading, error } = useQuery<Types.Lobby, Types.LobbyVariables>(LOBBY_QUERY, {
    variables: { gameId },
  });

  return (
    <Game 
      data={data}
      loading={loading}
      error={error}
      gameId={gameId}
      subscribeToGame = {() => {
        subscribeToMore<Types.LOBBY_SUBSCRIPTION>({
          document: LOBBY_SUBSCRIPTION,
          variables: { gameId },
          updateQuery: (prev, { subscriptionData }) => {
            console.log('LOBBY_SUBSCRIPTION update!');
            if (!subscriptionData.data) return prev;
            return Object.assign({},prev,subscriptionData.data)
          }
        })
      }}
    />
  )
};
