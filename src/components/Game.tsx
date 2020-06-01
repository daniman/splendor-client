import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useQuery, gql } from '@apollo/client';
import { Button } from '@apollo/space-kit/Button';
import { colors } from '@apollo/space-kit/colors';
import { LoadingSpinner } from '@apollo/space-kit/Loaders';
import { RouteComponentProps } from 'react-router-dom';
import { Lobby } from './Lobby';
import { Board } from './Board';
import { playWav } from '../modules/playWav';

import * as Types from '../types';

const GAME_STATE_QUERY = gql`
  query GamePage($gameId: ID!) {
    game(id: $gameId) {
      id
      name
      state
      currentTurn {
        id
      }
      turns {
        when
      }
    }
  }
`;

const usePrevious = <T extends any>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const Game: React.FC<RouteComponentProps<{ gameId: string }>> = ({
  match,
}) => {
  const { data, loading, error } = useQuery<Types.GamePage>(GAME_STATE_QUERY, {
    variables: { gameId: match.params.gameId },
    pollInterval: 3000,
  });
  const localPlayerId = localStorage.getItem(`splendor:${match.params.gameId}`);
  const [ticker, setTicker] = useState('');

  const state = data?.game?.state;
  const prevState = usePrevious(state);
  useEffect(() => {
    if (
      prevState === Types.GameState.LOBBY &&
      state === Types.GameState.ACTIVE
    ) {
      playWav('smb3_pipe');
    }
  }, [prevState, state]);

  const turn = data?.game?.currentTurn?.id;
  const lastTurn = data?.game?.turns.slice(-1)[0];
  const prevTurn = usePrevious(turn);
  useEffect(() => {
    let interval: any = null;
    if (
      localPlayerId === 'sudo' ||
      (prevTurn !== localPlayerId && turn === localPlayerId)
    ) {
      playWav('smb3_jump');

      if (lastTurn) {
        interval = setInterval(() => {
          const diff = moment().diff(lastTurn.when);
          setTicker(moment(diff).format('mm:ss'));
        }, 1000);
      }
    } else if (turn !== localPlayerId) {
      clearInterval(interval);
    }
  }, [localPlayerId, prevTurn, turn, lastTurn]);

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

  return (
    <Board gameId={data.game.id} localPlayerId={localPlayerId} ticker={ticker}/>
  );
};
