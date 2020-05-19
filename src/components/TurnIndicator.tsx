import React from 'react';
import * as Types from '../types';

export const TurnIndicator: React.FC<{
  name: String;
  state: Types.GameState;
  players: Types.GameBoard_game_players[];
  activePlayer: Types.GameBoard_game_currentTurn;
  localPlayerId: string | null;
}> = ({ name, state, players, activePlayer, localPlayerId }) => {
  const winningPlayer = players.filter(p => p.score === Math.max(...players.map((q) => q.score)))[0].id;

  return (
    <div className="row" style={{ marginBottom: 40 }}>
      <div className="col-md-6">
        <h1 style={{ marginTop: 0, marginBottom: 20, lineHeight: 1 }}>{name}</h1>
        {state === Types.GameState.COMPLETE ? (
          <code style={{ marginLeft: 10 }}>
            {winningPlayer}{' '}
            wins!
          </code>
        ) : activePlayer.id === localPlayerId ? (
          <h3 style={{ marginTop: 0 }}>
            It's your turn!
          </h3>
        ) : (
          <h3 style={{ marginTop: 0 }}>
            It's <code>{activePlayer.id}</code>'s turn!
          </h3>
        )}
      </div>
    </div>
  )
}
