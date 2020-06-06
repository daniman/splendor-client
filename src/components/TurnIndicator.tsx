import React from 'react';
import { Button } from '@apollo/space-kit/Button';
import { colors } from '@apollo/space-kit/colors';
import { Link } from 'react-router-dom';
import * as Types from '../types';

export const TurnIndicator: React.FC<{
  name: String;
  state: Types.GameState;
  players: Types.GameBoard_game_players[];
  activePlayer: Types.GameBoard_game_currentTurn;
  localPlayerId: string | null;
  ticker: string;
}> = ({ name, state, players, activePlayer, localPlayerId, ticker }) => {
  const winningPlayer = players.filter(
    (p) => p.score === Math.max(...players.map((q) => q.score))
  )[0].id;

  return (
    <div
      className="row"
      style={{
        marginBottom: 20,
      }}
    >
      <div
        className="col-xs-12"
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: 0, marginRight: 20 }}>
          {name}
        </h1>
        {state === Types.GameState.COMPLETE ? (
          <span>
            ✨ 🥇 🏆 <code>{winningPlayer}</code> has won 🏆 🥇 ✨
          </span>
        ) : !!localPlayerId ? (
          <span>
            👋 you are playing as <code>{localPlayerId}</code>
          </span>
        ) : (
          <span>
            <i>you are observing</i>
          </span>
        )}
        {/* <span style={{ fontWeight: 900 }}>
        {state === Types.GameState.COMPLETE ? (
          <span>{winningPlayer}&nbsp;has won!</span>
        ) : activePlayer.id === localPlayerId ? (
          <span>
            👋 It's your turn!&nbsp;<code>{ticker}</code>
          </span>
        ) : (
          <span>
            It's <code>{activePlayer.id}</code>'s turn!
          </span>
        )}
      </span>
      <span>
        You are{' '}
        {!localPlayerId ? <span>observing</span> : <span>playing in</span>} the
        game: <code>{name}</code>
      </span> */}
        <Button
          style={{ position: 'absolute', right: 15 }}
          size="small"
          theme="dark"
          color={colors.blue.base}
          as={<Link to="/" />}
        >
          Return to Lobby
        </Button>
      </div>
    </div>
  );
};
