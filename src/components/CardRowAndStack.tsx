import React from 'react';
import { Card, PlaceholderCard } from './Card';
import { Dots } from './Dots';
import * as Types from '../types';
import { AnimatePresence, motion } from 'framer-motion';
//import { createFileLevelUniqueName } from 'typescript';

export type TopOfDeck = { type: Types.CardStackType };

export const CardRowAndStack: React.FC<{
  cards: Types.CardSelection[];
  turnCardState: Types.CardSelection | TopOfDeck | null;
  level: Types.CardStackType;
  remaining: number;
  onSelect?: (c: Types.CardSelection | TopOfDeck) => void;
}> = ({ cards, turnCardState, level, remaining, onSelect }) => {
return (
  <div style={{ display: 'flex', marginBottom: 10 }}>
    {cards.map((card) => (
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={card.id}
          id={card.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { easings: "easeIn" }
          }}
          exit={{
            opacity: 0,
            y: 10,
            transition: { easings: "easeOut" }
          }}
        >
          {turnCardState &&
          (turnCardState as Types.CardSelection).id === card.id ? (
            <PlaceholderCard label="x" />
          ) : (
            <Card
              card={card}
              onSelect={(card: Types.CardSelection) => {
                if (onSelect) onSelect(card);
              }}
              availableForPurchase={true}
              key={card.id}
            />
          )}
        </motion.div>
      </AnimatePresence>
    ))}
    <div
      className="clickable secret card"
      style={{
        backgroundColor: 'rgba(255,255,255,0.1)',
        flex: 'none',
        padding: 8,
      }}
      onClick={() => {
        if (onSelect) onSelect({ type: level });
      }}
    >
      <div
        style={{
          flex: 1,
          fontSize: 12,
          textAlign: 'center',
        }}
      >
        <code>{remaining}</code>
      </div>
      <Dots count={level.length} />
    </div>
  </div>
)};
