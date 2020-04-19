import React from 'react';
import { colors } from '../config/colors';
import * as GlobalTypes from '../../__generated__/globalTypes';

export const CoinStack: React.FC<{
  onSelect: (c: GlobalTypes.GemColor) => void;
  radius?: number;
  quantity: number;
  color: GlobalTypes.GemColor;
}> = ({ onSelect, color, radius = 72, quantity }) => (
  <div
    style={{
      width: radius,
      marginRight: 16,
      marginLeft: 16,
      cursor: 'pointer',
    }}
    onClick={() => {
      onSelect(color);
    }}
  >
    <div style={{ textAlign: 'center' }}>{quantity}</div>
    {new Array(quantity).fill(0).map((_j, i) => (
      <div
        key={i}
        style={{
          backgroundColor: colors[color],
          height: 4,
          marginBottom: 2,
          borderRadius: 2,
        }}
      />
    ))}
  </div>
);
