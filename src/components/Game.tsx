/* This component renders the game depending on its state. If the game has not
 * started yet the Lobby component is rendered otherwise the Board component is rendered.
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ApolloError } from '@apollo/client';
import { Button } from '@apollo/space-kit/Button';
import { colors } from '@apollo/space-kit/colors';
import { LoadingSpinner } from '@apollo/space-kit/Loaders';
import { Lobby } from './Lobby';
import { BoardContainer } from '../containers/BoardContainer';
import { cookie } from '../modules/cookie';
import { playWav } from '../modules/playWav';
import { usePrevious } from '../modules/usePrevious';

import * as Types from '../types';

export const Game: React.FC <{ subscribeToGame: any; gameId: String; data: Types.Lobby | undefined; loading: boolean;  error: ApolloError | undefined}> =
  ({ subscribeToGame, gameId, data, loading, error }) => {
  useEffect(() => subscribeToGame());

  const playerId = cookie.get(`splendor:${gameId}`);
  const state = data?.game?.state;
  const prevState = usePrevious(state);

  useEffect(() => {
    if ( prevState === Types.GameState.LOBBY && state === Types.GameState.ACTIVE ) {
      playWav('smb3_pipe');
    }
  }, [prevState, state]);

  if (loading) return <LoadingSpinner theme="dark" size="small" />;
  else if (error) return <div style={{ color: 'red' }}>{error.message}</div>;
  else if (!data || !data.game) return (
    <>
      <div>
        No game matching identifier <code>{gameId}</code> was found.
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
    </>
  );

  else if (data?.game?.state === Types.GameState.LOBBY) return <Lobby game={data.game} />; 
  else return <BoardContainer gameId={data.game.id} playerId={playerId} />;
};
