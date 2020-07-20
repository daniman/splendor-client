import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_GAMES_QUERY } from '../gql/queries';
import { ALL_GAMES_SUBSCRIPTION } from '../gql/subscriptions';
import { Home } from '../components/Home';
import * as Types from '../types';

export const HomeContainer: React.FC = () => {
  const { subscribeToMore, data, loading, error } = useQuery<Types.AllGames>(
    ALL_GAMES_QUERY
  );
  return (
    <Home
      data={data}
      loading={loading}
      error={error}
      subscribeToNewGames={() => {
        subscribeToMore({
          document: ALL_GAMES_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;

            const newGame: Types.AllGames_allGames =
              subscriptionData.data.allGamesPub;
            const existingIdx = prev.allGames.findIndex(
              (e) => e.id === newGame.id
            );

            const gameArray = prev.allGames.slice();
            existingIdx === -1
              ? gameArray.push(newGame)
              : gameArray.splice(existingIdx, 1, newGame);

            return { allGames: gameArray, allGamesPub: null };
          },
        });
      }}
    />
  );
};
