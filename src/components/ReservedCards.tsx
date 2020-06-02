import React from 'react';
import { Card, PlaceholderCard } from './Card';
import * as Types from '../types';
import { TopOfDeck } from './Board';

export const ReservedCards: React.FC<{
  cards: (Types.GameBoard_game_players_reservedCards | null)[];
  canAct: boolean;
  turnCardState: Types.CardSelection | TopOfDeck | null;
  setTurnCardState: React.Dispatch<React.SetStateAction<Types.CardSelection | TopOfDeck | null>>
}> = ( { cards , canAct, turnCardState, setTurnCardState } ) => (
  <>
    {cards && cards.length > 0 && (
      <>
      <div style={{ marginBottom: 20 }}>
        <h3>Reserved:</h3>
          <div style={{ display: 'flex' }}>
            {cards.map((c, i: string | number | undefined) =>
              !!c ? (
                turnCardState &&
                c.id === (turnCardState as Types.CardSelection).id ? (
                  <PlaceholderCard label="x" key={i}/>
                ) : (
                  <Card
                    key={c.id}
                    card={c}
                    onSelect={() => {
                      canAct && setTurnCardState(c);
                    }}
                    style={{ marginLeft: 0, marginRight: 10 }}
                  />
                )
              ) : (
                <PlaceholderCard
                  key={i}
                  label="SECRET"
                  style={{ marginRight: 10 }}
                />
              )
            )}
          </div>
        </div>
      </>
    )}
  </>
)
