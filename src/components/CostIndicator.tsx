import React from 'react';

export const CostIndicator: React.FC<{
  value: number;
  color: string;
  style?: object;
}> = ({ value, color, style = {} }) => (
  <div className='costIndicator'
    style={{
      ...style,
      backgroundColor: color,
      color: color === '#FFFFFF' ? 'rgb(18, 21, 26)' : 'white',
    }}
  >
    {value}
  </div>
);
