import React from 'react';
import { gql } from '@apollo/client';
import { CostIndicator } from './CostIndicator';
import { colors, darkColors } from '../config/colors';
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
  onSelect?: (c: Types.CardSelection) => void;
  card: Types.CardSelection;
  title?: string;
}> = ({ style = {}, onSelect, card, title }) => {
  const { gemColor, pointValue, cost } = card;

  return (
    <div
      title={title || ''}
      className={!!onSelect ? 'clickable' : ''}
      style={{
        position: 'relative',
        marginLeft: 10,
        backgroundColor: `${gemColor ? darkColors[gemColor] : '#FFFFFF'}`,
        flex: 'none',
        width: 100,
        height: 100,
        borderRadius: 8,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      onClick={() => {
        if (onSelect) onSelect(card);
      }}
    >
      <div
        style={{
          flex: 0,
          display: 'flex',
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: 8,
        }}
      >
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
          alignItems: 'flex-end',
          padding: 8,
        }}
      >
        {cost
          .filter((c) => c.quantity > 0)
          .map(({ gemColor, quantity }, i) => (
            <CostIndicator
              key={gemColor}
              value={quantity}
              color={colors[gemColor]}
              style={{ marginRight: i === cost.length - 1 ? 0 : 4 }}
            />
          ))}
      </div>
    </div>
  );
};
