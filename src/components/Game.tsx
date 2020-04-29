import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Button } from '@apollo/space-kit/Button';
import { colors } from '@apollo/space-kit/colors';
import { LoadingSpinner } from '@apollo/space-kit/Loaders';
import { RouteComponentProps } from 'react-router-dom';
import { Lobby } from './Lobby';
import { Board } from './Board';

import * as Types from '../types';

const GAME_STATE_QUERY = gql`
  query GamePage($gameId: ID!) {
    game(id: $gameId) {
      id
      name
      state
    }
  }
`;

export const Game: React.FC<RouteComponentProps<{ gameId: string }>> = ({
  match,
}) => {
  const { data, loading, error } = useQuery<Types.GamePage>(GAME_STATE_QUERY, {
    variables: { gameId: match.params.gameId },
    pollInterval: 3000,
  });

  if (loading) return <LoadingSpinner theme="dark" size="small" />;
  if (error) return <div style={{ color: 'red' }}>{error.message}</div>;
  if (!data || !data.game)
    return (
      <div>
        <div>
          <code>
            No game matching identifier {match.params.gameId} was found.
          </code>
        </div>
        <Button
          color={colors.pink.base}
          size="small"
          theme="dark"
          style={{ marginTop: 20 }}
          as={<Link to="/" />}
        >
          Go Home
        </Button>
      </div>
    );

  if (data.game.state === Types.GameState.LOBBY) {
    return <Lobby gameId={data.game.id} />;
  }

  return <Board gameId={data.game.id} />;
};
