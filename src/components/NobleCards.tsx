import React from 'react';
import { NobleCard } from './NobleCard';
import * as Types from '../types';

export const NobleCards: React.FC<{
  cards: (Types.GameBoard_game_players_nobles)[];
}> = ( { cards } ) => {
  if (cards?.length > 0) return (
    <>
      <h3>Nobles:</h3>
      <div style={{ display: 'flex', marginBottom: 40 }}>
        {cards.map((card) => (
          <NobleCard
            key={card?.id}
            card={card}
            title="You have attracted this noble with your great wealth."
          />
        ))}
      </div>
    </>
  )
  else { 
    return (
      <></>
    )
  }
}
