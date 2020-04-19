import React from 'react';

export const CostIndicator: React.FC<{ value: number; color: string }> = ({
  value,
  color,
}) => (
  <div
    style={{
      marginTop: 4,
      fontSize: 12,
      height: 20,
      width: 20,
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
