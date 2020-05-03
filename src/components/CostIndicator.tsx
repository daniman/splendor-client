import React from 'react';

export const CostIndicator: React.FC<{
  value: number;
  color: string;
  style?: object;
}> = ({ value, color, style = {} }) => (
  <div
    style={{
      ...style,
      fontSize: 10,
      height: 16,
      width: 16,
      borderRadius: 24,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color,
      color: color === '#FFFFFF' ? 'rgb(18, 21, 26)' : 'white',
      fontWeight: 900,
    }}
  >
    {value}
  </div>
);
