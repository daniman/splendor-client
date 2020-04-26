import React from 'react';
import { CostIndicator } from './CostIndicator';
import { colors } from '../config/colors';
import * as Types from '../types';

export const NobleCard: React.FC<{
  card: Types.CardSelection;
}> = ({ card: { pointValue, cost } }) => (
  <div
    style={{
      backgroundColor: colors.none,
      margin: 10,
      flex: 'none',
      width: 130,
      height: 130,
      padding: 8,
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div
      style={{
        flex: 0,
        display: 'flex',
        marginBottom: 8,
        lineHeight: 1,
        fontSize: 32,
        fontWeight: 900,
      }}
    >
      <div style={{ flex: 1 }}>{pointValue}</div>👑
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
