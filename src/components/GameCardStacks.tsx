import React from 'react';
import * as Types from '../types';
import { CardRowAndStack } from './CardRowAndStack';
import { TopOfDeck } from './CardRowAndStack';

export const GameCardStacks: React.FC<{
  cardStacks: Types.GameBoard_game_cardStacks[];
  canAct: boolean;
  turnCardState: Types.CardSelection | TopOfDeck | null;
  setTurnCardState: React.Dispatch<
    React.SetStateAction<Types.CardSelection | TopOfDeck | null>
  >;
}> = ({ cardStacks, canAct, turnCardState, setTurnCardState }) => (
  <div style={{ position: 'relative', marginBottom: 40 }}>
    {cardStacks.map(({ type, remaining, cards }) => (
      <CardRowAndStack
        key={`${type}-${remaining}`}
        cards={cards}
        turnCardState={turnCardState}
        remaining={remaining}
        level={type}
        onSelect={(card: Types.CardSelection | TopOfDeck) => {
          canAct && setTurnCardState(card);
        }}
      />
    ))}
  </div>
);
