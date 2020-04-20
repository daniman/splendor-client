import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Card } from './Card';
import { colors } from '../config/colors';

import * as CardSelectionTypes from '../../__generated__/CardSelection';
import * as ReserveCardTypes from '../../__generated__/ReserveCard';

const RESERVE_CARD_MUTATION = gql`
  mutation ReserveCard($gameId: ID!, $playerId: ID!, $cardId: ID!) {
    game(id: $gameId) {
      takeTurn(playerId: $playerId, reserveCardById: $cardId) {
        id
        turns {
          type
        }
        stacks {
          cards {
            id
          }
        }
        player(id: $playerId) {
          id
          bank {
            gemColor
            quantity
          }
          reservedCards {
            id
          }
        }
        bank {
          gemColor
          quantity
        }
      }
    }
  }
`;

export const CardRowAndStack: React.FC<{
  playerId: string;
  gameId: string;
  cards: CardSelectionTypes.CardSelection[];
  level: 1 | 2 | 3;
  remaining: number;
}> = ({ cards, level, remaining, playerId, gameId }) => {
  const [reserveCard] = useMutation<ReserveCardTypes.ReserveCard>(
    RESERVE_CARD_MUTATION,
    { refetchQueries: ['GameBoard'] }
  );

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          backgroundColor: colors.none,
          margin: 10,
          flex: 'none',
          width: 130,
          height: 160,
          padding: 8,
          borderRadius: 8,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            flex: 1,
            fontSize: 12,
            textAlign: 'center',
          }}
        >
          {remaining} cards left
        </div>
        <div
          style={{ flex: 'none', display: 'flex', justifyContent: 'center' }}
        >
          {new Array(level).fill(0).map((_j, i) => (
            <div
              key={i}
              style={{
                height: 6,
                width: 6,
                borderRadius: 6,
                backgroundColor: 'white',
                opacity: 0.8,
                marginRight: 2,
                marginLeft: 2,
              }}
            />
          ))}
        </div>
      </div>
      {cards.map((card, i) => (
        <Card
          key={i}
          card={card}
          onSelect={() => {
            reserveCard({ variables: { cardId: card.id, playerId, gameId } });
          }}
        />
      ))}
    </div>
  );
};
