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
      color: 'white',
      fontWeight: 900,
    }}
  >
    {value}
  </div>
);
