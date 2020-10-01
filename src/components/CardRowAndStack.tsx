import React from 'react';
import { Card, PlaceholderCard } from './Card';
import * as Types from '../types';
import { AnimatePresence, motion } from 'framer-motion';

export type TopOfDeck = { type: Types.CardStackType };

export const CardRowAndStack: React.FC<{
  cards: Types.CardSelection[];
  turnCardState: Types.CardSelection | TopOfDeck | null;
  level: Types.CardStackType;
  remaining: number;
  onSelect?: (c: Types.CardSelection | TopOfDeck) => void;
}> = ({ cards, turnCardState, level, remaining, onSelect }) => (
  <div style={{ display: 'flex', marginBottom: 10 }}>
    <AnimatePresence>
      {cards.map((card, i) => (
        <motion.div
          key={card.id}
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
            />
          )}
        </motion.div>
      ))}
    </AnimatePresence>
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
      <div style={{ flex: 'none', display: 'flex', justifyContent: 'center' }}>
        {new Array(level.length).fill(0).map((_j, i) => (
          <div className='dots' key={i} />
        ))}
      </div>
    </div>
  </div>
);
