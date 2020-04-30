import React from 'react';
import { CostIndicator } from './CostIndicator';
import { colors, darkColors } from '../config/colors';
import * as Types from '../types';

export const NobleCard: React.FC<{
  card: Types.CardSelection;
  title?: string;
}> = ({ title, card: { pointValue, cost } }) => (
  <div
    style={{
      backgroundColor: `${darkColors.YELLOW}`,
      marginRight: 10,
      flex: 'none',
      width: 100,
      height: 100,
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'column',
    }}
    title={title || 'You cannot select Nobles. They come to you.'}
  >
    <div
      style={{
        flex: 0,
        display: 'flex',
        marginBottom: 8,
        lineHeight: 1,
        fontSize: 32,
        fontWeight: 900,
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
      }}
    >
      <div style={{ flex: 1 }}>{pointValue}</div>👑
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
        .map(({ gemColor, quantity }) => (
          <CostIndicator
            key={gemColor}
            value={quantity}
            color={colors[gemColor]}
            style={{ marginRight: 4 }}
          />
        ))}
    </div>
  </div>
);
