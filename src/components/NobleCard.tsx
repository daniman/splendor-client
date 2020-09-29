import React from 'react';
import { CostIndicator } from './CostIndicator';
import { colors, darkColors } from '../config/colors';
import * as Types from '../types';

export const NobleCard: React.FC<{
  card: Types.CardSelection;
  title?: string;
}> = ({ title, card: { pointValue, cost } }) => (
  <div className='card noble'
    style={{
      backgroundColor: `${darkColors.YELLOW}`,
    }}
    title={title || 'You cannot select Nobles. They come to you.'}
  >
    <div className='top'>
      <div className='pointValue'>{pointValue}</div>
      <span style={{marginTop: -10}} role='img' aria-label='crown'>👑</span>
    </div>

    <div className='bottom'>
      {cost
        .filter((c) => c.quantity > 0)
        .map(({ gemColor, quantity }) => (
          <CostIndicator
            key={gemColor}
            value={quantity}
            color={colors[gemColor]}
            style={{ marginRight: 4, borderRadius: 2 }}
          />
        ))}
    </div>
  </div>
);
