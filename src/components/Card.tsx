import React from 'react';
import { gql } from '@apollo/client';
import { CostIndicator } from './CostIndicator';
import { colors } from '../config/colors';
import * as Types from '../types';

export const CARD_FRAGMENT = gql`
  fragment CardSelection on Card {
    id
    gemColor
    pointValue
    cost {
      gemColor
      quantity
    }
  }
`;

export const Card: React.FC<{
  style?: any;
  onSelect: (id: string) => void;
  card: Types.CardSelection;
}> = ({ style = {}, onSelect, card }) => {
  const { id, gemColor, pointValue, cost } = card;

  return (
    <div
      style={{
        cursor: 'pointer',
        margin: 10,
        backgroundColor: `${gemColor ? colors[gemColor] : '#FFFFFF'}1A`,
        flex: 'none',
        width: 130,
        height: 160,
        padding: 8,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      onClick={() => {
        onSelect(id);
      }}
    >
      <div style={{ flex: 0, display: 'flex', marginBottom: 8 }}>
        <div style={{ flex: 1, lineHeight: 1, fontSize: 32, fontWeight: 900 }}>
          {pointValue || ''}
        </div>
        <div
          style={{
            flex: 'none',
            backgroundColor: gemColor ? colors[gemColor] : '#FFFFFF',
            height: 32,
            width: 32,
            borderRadius: 32,
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        {cost
          .filter((c) => c.quantity > 0)
          .map(({ gemColor, quantity }) => (
            <CostIndicator
              key={gemColor}
              value={quantity}
              color={colors[gemColor]}
            />
          ))}
      </div>
    </div>
  );
};
