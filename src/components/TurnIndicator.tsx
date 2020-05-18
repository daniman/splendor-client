import React from 'react';
import * as Types from '../types';

export const TurnIndicator: React.FC<{
  game: Types.GameBoard_game;
  activePlayer: Types.GameBoard_game_currentTurn;
}> = ({ game, activePlayer}) => (
  <div className="row" style={{ marginBottom: 40 }}>
    <div className="col-md-6">
      <h1 style={{ marginTop: 0, marginBottom: 20, lineHeight: 1 }}>
        {game.name}
        {game.state === Types.GameState.COMPLETE && (
          <code style={{ marginLeft: 10 }}>
            {
              game.players.filter(
                (p) =>
                  p.score ===
                  Math.max(...game!.players.map((q) => q.score))
              )[0].id
            }{' '}
            wins!
          </code>
        )}
      </h1>
      {game.state !== Types.GameState.COMPLETE && (
        <h3 style={{ marginTop: 0 }}>
          It's <code>{activePlayer.id}</code>'s turn.
        </h3>
      )}
    </div>
  </div>
)
