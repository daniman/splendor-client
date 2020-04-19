import React from 'react';
import { Card } from './Card';
import { colors } from '../config/colors';
import * as CardSelectionTypes from '../../__generated__/CardSelection';

export const CardRowAndStack: React.FC<{
  onSelect?: (id: string) => void;
  cards: CardSelectionTypes.CardSelection[];
  level: 1 | 2 | 3;
}> = ({ cards, level, onSelect }) => {
  const showing = cards.slice(0, 4);

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          backgroundColor: colors.none,
          margin: 10,
          flex: 'none',
          width: 130,
          height: 160,
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
          {cards.length - showing.length} cards left
        </div>
        <div
          style={{ flex: 'none', display: 'flex', justifyContent: 'center' }}
        >
          {new Array(level).fill(0).map((_j, i) => (
            <div
              key={i}
              style={{
                height: 6,
                width: 6,
                borderRadius: 6,
                backgroundColor: 'white',
                opacity: 0.8,
                marginRight: 2,
                marginLeft: 2,
              }}
            />
          ))}
        </div>
      </div>
      {showing.map((card, i) => (
        <Card key={i} card={card} onSelect={onSelect ? onSelect : () => {}} />
      ))}
    </div>
  );
};
