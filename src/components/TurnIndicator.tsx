import React from 'react';
import * as Types from '../types';

export const TurnIndicator: React.FC<{
  name: String;
  state: Types.GameState;
  players: Types.GameBoard_game_players[];
  activePlayer: Types.GameBoard_game_currentTurn;
  localPlayerId: string | null;
  ticker: string
}> = ({ name, state, players, activePlayer, localPlayerId, ticker }) => {
  const winningPlayer = players.filter(p => p.score === Math.max(...players.map((q) => q.score)))[0].id;

  return (
    <>
      <div className="col-md-2">
        <span style={{fontWeight: 900}}>
        {state === Types.GameState.COMPLETE ? (
          <span>
            {winningPlayer}&nbsp;has won!
          </span>
        ) : activePlayer.id === localPlayerId ? (
          <span>It's your turn!&nbsp;<code>{ticker}</code></span>
        ) : (
          <span>It's <code>{activePlayer.id}</code>'s turn!</span>
        )}
        </span>
      </div>
      <div className="col-md-4">
        <span>
          You are {!localPlayerId ? <span>observing</span> : <span>playing in</span>} the game: <code>{name}</code>
        </span>
      </div>
    <div className="col-md-3">
      <span>
        Welcome to Splendoor!
      </span>
    </div>
      <div className="col-md-3">
        <span style={{float: 'right'}}><a href="/">Return to Lobby</a></span>
      </div>
    </>
  )
}
