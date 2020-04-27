import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Lobby } from './components/Lobby';
import { GameBoard } from './components/GameBoard';

import * as Types from './types';

/**
 * - Build a turn log.
 * - Build a home for games to be created, where players can access their lobby on the game route.
 * - Build games their own routing system with :gameId.
 * - Look for TODOs.
 */

const GAME_STATE_QUERY = gql`
  query GamePage {
    game(id: "1234") {
      id
      name
      state
    }
  }
`;

export const App: React.FC = () => {
  const { data, loading, error } = useQuery<Types.GamePage>(GAME_STATE_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error.message}</div>;
  if (!data || !data.game) return <div>No game found :(</div>;

  if (data.game.state === Types.GameState.LOBBY) {
    return <Lobby gameId={data.game.id} />;
  }

  // if (data.game.state === Types.GameState.COMPLETE) {
  //   // TODO: build some sort of trophy page, maybe with a replay of turns and stuff
  //   return <div>This game is complete! Thanks for playing.</div>;
  // }

  return <GameBoard gameId={data.game.id} />; // ACTIVE
};
