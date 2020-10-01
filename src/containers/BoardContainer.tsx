import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GAME_BOARD_QUERY } from '../gql/queries';
import { GAME_BOARD_SUBSCRIPTION } from '../gql/subscriptions';
import { Board } from '../components/Board';
import * as Types from '../types';

export const BoardContainer: React.FC<{ gameId: string; playerId: string }> = ({
  gameId,
  playerId,
}) => {
  const { subscribeToMore, data, loading, error } = useQuery<Types.GameBoard>(
    GAME_BOARD_QUERY,
    {
      variables: { gameId, playerId },
    }
  );

  useEffect(() => subscribeToMore<Types.GAME_BOARD_SUBSCRIPTION>({
    document: GAME_BOARD_SUBSCRIPTION,
    variables: { gameId, playerId },
    updateQuery: (prev, { subscriptionData }) => {
      console.log('GAME_BOARD_SUBSCRIPTION update!');
      if (!subscriptionData.data) return prev;
      return Object.assign({}, prev, subscriptionData.data);
    },
  }), [gameId, playerId, subscribeToMore])

  return (
    <Board
      data={data}
      loading={loading}
      error={error}
      playerId={playerId}
    />
  );
};
