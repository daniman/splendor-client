import React from 'react';
import * as Types from '../types';
import { CoinStack } from './CoinStack';

export const TurnCoins:  React.FC<{
  coinState: Types.GemColor[];
  setCoinState: React.Dispatch<React.SetStateAction<Types.GemColor[]>>;
  gemColor: Types.GemColor;
  column: number;
  inverted?: boolean;
}> = ({ coinState, setCoinState, gemColor, column, inverted }) => (
  <>
    {coinState.filter((c: Types.GemColor) => c === gemColor).length > 0 && (
      <CoinStack
        key={inverted ? `inverted-${gemColor}` : gemColor}
        style={inverted ? 
          { gridRow: 2, gridColumn: column + 1, alignSelf: 'start' } : 
          { gridRow: 1, gridColumn: column + 1, alignSelf: 'end' }
        }
        inverted={inverted}
        color={gemColor}
        quantity={coinState.filter((c) => c === gemColor).length}
        onSelect={(color) => { // coin being returned from the turn builder
          const i = coinState.findIndex((c) => c === color);
          coinState.splice(i, 1);
          setCoinState([...coinState]);
        }}
      />
    )}
  </>
)
