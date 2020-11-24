import React from 'react';

export const Dots: React.FC<{
  count: number;
}> = ({ count }) => {
  const arr = Array(count).fill(0);
  return (
    <div style={{ flex: 'none', display: 'flex', justifyContent: 'center' }}>
      {arr.map((el,i) => (
        <div className="dots" key={i}/>
      ))}
    </div>
  );
};
