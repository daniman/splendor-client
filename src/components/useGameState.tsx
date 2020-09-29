import React from 'react';
import * as Types from '../types';

type GameState = Types.GameBoard_game & {
  me: Types.GameBoard_game_players
}

const GameStateContext = React.createContext<GameState | null | undefined>(
  undefined
);

export const GameStateProvider: React.FC<{
  children: React.ReactNode;
  gameState: GameState | null | undefined;
}> = ({ children, gameState }) => {
  return (
    <GameStateContext.Provider value={gameState}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = React.useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within an GameStateProvider');
  }
  return context;
};
