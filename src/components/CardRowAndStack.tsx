import React from 'react';
// import { useMutation, gql } from '@apollo/client';
import { Card } from './Card';
import * as Types from '../types';

// reserveCard({ variables: { cardId: card.id, playerId, gameId } });
// const [reserveCard] = useMutation<Types.ReserveCard>(RESERVE_CARD_MUTATION, {
//   refetchQueries: ['GameBoard'],
// });

export const CardRowAndStack: React.FC<{
  cards: Types.CardSelection[];
  turnCardState: Types.CardSelection | null;
  level: 1 | 2 | 3;
  remaining: number;
  onSelect?: (c: Types.CardSelection) => void;
}> = ({ cards, turnCardState, level, remaining, onSelect }) => (
  <div style={{ display: 'flex', marginBottom: 10 }}>
    <div
      style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        flex: 'none',
        width: 100,
        height: 100,
        padding: 8,
        borderRadius: 8,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: 1,
          fontSize: 12,
          textAlign: 'center',
        }}
      >
        <code style={{ marginLeft: 10 }}>{remaining}</code>
      </div>
      <div style={{ flex: 'none', display: 'flex', justifyContent: 'center' }}>
        {new Array(level).fill(0).map((_j, i) => (
          <div
            key={i}
            style={{
              height: 6,
              width: 6,
              borderRadius: 6,
              backgroundColor: 'rgba(255,255,255,0.2)',
              opacity: 0.8,
              marginRight: 2,
              marginLeft: 2,
            }}
          />
        ))}
      </div>
    </div>
    {cards.map((card, i) =>
      turnCardState && turnCardState.id === card.id ? (
        <div
          key={card.id}
          style={{
            marginLeft: 10,
            width: 100,
            height: 100,
            display: 'flex',
            backgroundColor: 'rgba(255,255,255,0.01)',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <code>x</code>
        </div>
      ) : (
        <Card
          key={card.id}
          card={card}
          onSelect={(card: Types.CardSelection) => {
            if (onSelect) onSelect(card);
          }}
        />
      )
    )}
  </div>
);
