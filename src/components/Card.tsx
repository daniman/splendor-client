import React from 'react';
import { CostIndicator } from './CostIndicator';
import { colors, darkColors } from '../config/colors';
import * as Types from '../types';

export const PlaceholderCard: React.FC<{
  label?: any;
  style?: object;
  onClick?: () => void;
}> = ({ label, style, onClick }) => (
  <div
    className={!!onClick ? 'clickable card placeholder' : 'card placeholder'}
    style={{
      backgroundColor: 'rgba(255,255,255,0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      ...style,
    }}
    onClick={() => {
      if (onClick) onClick();
    }}
  >
    {label && <code>{label}</code>}
  </div>
);

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
      className={!!onSelect ? 'clickable card' : 'card'}
      style={{
        backgroundColor: `${gemColor ? darkColors[gemColor] : '#FFFFFF'}`,
        ...style,
      }}
      onClick={() => {
        if (onSelect) onSelect(card);
      }}
    >
      <div className="top">
        <div className="pointValue">{pointValue || ''}</div>
        <div
          className="bubble"
          style={{
            backgroundColor: gemColor ? colors[gemColor] : '#FFFFFF',
          }}
        />
      </div>
      <div className="bottom">
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
