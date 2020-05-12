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
  const [ticker, setTicker] = useState('');

  const localPlayerId = localStorage.getItem(`splendor:${match.params.gameId}`);

  const state = data?.game?.state;
  const prevState = usePrevious(state);
  useEffect(() => {
    if (
      prevState === Types.GameState.LOBBY &&
      state === Types.GameState.ACTIVE
    ) {
      const snd = new Audio('./smb3_pipe.wav');
      snd.play();
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
      const snd = new Audio('./smb3_jump.wav');
      snd.play();

      if (lastTurn) {
        interval = setInterval(() => {
          const diff = moment().diff(lastTurn.when);
          setTicker(moment(diff).format('mm:ss'));
          // if (
          //   moment.duration(diff).asSeconds() ===
          //   moment.duration(10, 'seconds').asSeconds()
          // ) {
          //   console.log('apply sound');
          //   // const snd = new Audio('./smb3_jump.wav');
          //   // snd.play();
          // }
        }, 1000);
      }
    } else if (turn !== localPlayerId) {
      clearInterval(interval);
    }
    // return () => clearInterval(interval);
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
    <>
      <code
        style={{
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 8,
          paddingRight: 8,
          position: 'absolute',
          backgroundColor: '#e83e8c',
          top: 0,
          right: 0,
          color: 'white',
        }}
      >
        {!!localPlayerId ? `playing as: ${localPlayerId}` : 'you are observing'}
      </code>
      {data?.game?.currentTurn?.id === localPlayerId && (
        <code
          style={{
            position: 'absolute',
            right: 0,
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 8,
            paddingRight: 8,
            top: 24,
            color: 'white',
            backgroundColor: '#3F20BA',
          }}
        >
          It's your turn! <b>{ticker}</b>
        </code>
      )}
      <Board gameId={data.game.id} />
    </>
  );
};
