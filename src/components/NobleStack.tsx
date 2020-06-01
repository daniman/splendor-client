import React from 'react';
import { NobleCard } from './NobleCard';
import * as Types from '../types';

export const NobleStack: React.FC<{
  nobles: (Types.GameBoard_game_players_reservedCards)[];
}> = ( { nobles } ) => (
  <div style={{ position: 'relative', marginBottom: 10 }}>
    <div style={{ display: 'flex' }}>
      {nobles.map((card) => (
        <NobleCard key={card?.id} card={card} />
      ))}
    </div>
  </div>
)
