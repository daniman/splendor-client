import React from 'react';
import { Card } from './Card';
import * as Types from '../types';

export const PurchasedCards: React.FC<{
  cards: Types.PlayerSelection_purchasedCards[];
  bank: Types.GameBoard_game_bank[];
}> = ( { cards, bank } ) => (
  <div style={{ marginBottom: 20 }}>
    <h3>Purchased:</h3>
      {cards?.length ? (
        <div style={{ display: 'flex' }}>
          {bank.map(({ gemColor }) => (
            <div key={gemColor}>
              {cards
                .filter((c) => c.gemColor === gemColor)
                .map((c, i) => (
                  <Card
                    key={c.id}
                    card={c}
                    title="You own this card."
                    style={{
                      marginLeft: 0,
                      marginRight: 10,
                      marginTop: i === 0 ? 0 : -44,
                    }}
                  />
                ))}
            </div>
          ))}
        </div>
      ) : (
        <code>No purchased cards.</code>
      )}
    </div>
)
