import React from 'react';
import { Card, PlaceholderCard } from './Card';
import { TopOfDeck } from './Board';
import * as Types from '../types';

export const CardRowAndStack: React.FC<{
  cards: Types.CardSelection[];
  turnCardState: Types.CardSelection | TopOfDeck | null;
  level: Types.CardStackType;
  remaining: number;
  onSelect?: (c: Types.CardSelection | TopOfDeck) => void;
}> = ({ cards, turnCardState, level, remaining, onSelect }) => (
  <div style={{ display: 'flex', marginBottom: 10 }}>
    <div
      className="clickable"
      style={{
        backgroundColor: 'rgba(255,255,255,0.1)',
        flex: 'none',
        width: 100,
        height: 100,
        padding: 8,
        borderRadius: 8,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => {
        if (onSelect) onSelect({ type: level });
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
        {new Array(level.length).fill(0).map((_j, i) => (
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
      turnCardState && (turnCardState as Types.CardSelection).id === card.id ? (
        <PlaceholderCard label="x" style={{ marginLeft: 10 }} />
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
