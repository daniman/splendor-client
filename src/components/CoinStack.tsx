import React from 'react';
import { colors } from '../config/colors';
import * as Types from '../types';

export const CoinStack: React.FC<{
  onSelect?: (c: Types.GemColor) => void;
  radius?: number;
  quantity: number;
  color: Types.GemColor;
  style?: object;
}> = ({ onSelect, color, radius = 30, quantity, style }) => (
  <div
    className={!!onSelect && quantity > 0 ? 'clickable' : ''}
    title={
      !!onSelect && quantity === 0
        ? `No ${color} coins are available to take.`
        : ''
    }
    style={{
      width: radius,
      marginRight: 10,
      ...style,
    }}
    onClick={() => {
      if (quantity > 0 && !!onSelect) onSelect(color);
    }}
  >
    <div style={{ textAlign: 'center' }}>
      <code>{quantity}</code>
    </div>
    {quantity > 0 ? (
      <div className="coins">
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
    ) : (
      <div
        style={{
          height: 1,
          backgroundColor: 'rgba(255,255,255,0.2)',
          marginBottom: 2,
        }}
      />
    )}
  </div>
);
