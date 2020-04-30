import React from 'react';
import { CoinStack } from './CoinStack';

import * as Types from '../types';

export const Bank: React.FC<{
  bank: { gemColor: Types.GemColor; quantity: number }[];
  style?: object;
  onSelect: (c: Types.GemColor) => void;
}> = ({ bank, style = {}, onSelect }) => (
  <div style={{ display: 'flex', ...style }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {bank.map(({ gemColor, quantity }) => (
        <CoinStack
          key={gemColor}
          color={gemColor}
          quantity={quantity}
          onSelect={onSelect}
        />
      ))}
    </div>
  </div>
);
