import React from 'react';
import { useQuery } from '@apollo/client';
import { GAME_BOARD_QUERY } from '../gql/queries';
import { GAME_BOARD_SUBSCRIPTION } from '../gql/subscriptions';
import { Board } from '../components/Board';

export const BoardContainer = ({ gameId, playerId }) => {
  const { subscribeToMore, ...result } = useQuery(GAME_BOARD_QUERY, {
    variables: { gameId, playerId },
  });

  return <Board
    {...result}
    playerId={playerId}
    subscribeToGame = {() => {
      subscribeToMore({
        document: GAME_BOARD_SUBSCRIPTION,
        variables: { gameId, playerId },
        updateQuery: (prev, { subscriptionData }) => {
          console.log('GAME_BOARD_SUBSCRIPTION update!');
          if (!subscriptionData.data) return prev;
          return Object.assign({},prev,subscriptionData.data)
        }
      })
    }}
  />
}
