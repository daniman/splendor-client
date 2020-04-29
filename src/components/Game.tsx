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

/**
 * - Build a turn log.
 * - Find some better Card CSS.
 * - Build a home for games to be created.
 * - Maybe provide a list of all games and their state with links to them in Home?
 * - Use localStorage to keep track of player's identities.
 */

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
