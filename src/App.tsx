import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { NobleCard } from './components/NobleCard';
import { CoinStack } from './components/CoinStack';
import { CardRowAndStack } from './components/CardRowAndStack';
// import { PlayerView } from '../components/PlayerView';

import * as GameBoardTypes from '../__generated__/GameBoard';
import * as GlobalTypes from '../__generated__/globalTypes';

/**
 * Introduce error boundaries.
 * Catch errors.
 *
 * Build a turn log.
 *
 * Build a lobby for games to be created.
 *
 * Build a tab switcher for player views.
 *
 * Build modes for different turns.
 */

const GAME_BOARD_QUERY = gql`
  query GameBoard {
    game(id: "1234") {
      id
      name
      state
      players {
        id
        bank {
          gemColor
          quantity
        }
      }
      bank {
        gemColor
        quantity
      }
      stacks {
        type
        remaining
        cards {
          id
          gemColor
          pointValue
          cost {
            gemColor
            quantity
          }
        }
      }
    }
  }
`;

export const App: React.FC = () => {
  const { data, loading, error } = useQuery<GameBoardTypes.GameBoard>(
    GAME_BOARD_QUERY
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error.message}</div>;
  if (!data || !data.game) return <div>No game found :(</div>;

  // const onCardSelect = (stack: Card[], setStack: () => void) => {
  // return (id) => {
  //   const cardIndex = stack.findIndex((obj) => obj.id === id);
  //   const card = stack[cardIndex];
  //   let canBuy = true;
  //   Object.keys(card).forEach((gem) => {
  //     if (card[gem] > player.coins[gem]) canBuy = false;
  //     // todo: reduce player coin counts on purchase
  //   });
  //   if (!canBuy) return;
  //   const arr = stack.slice();
  //   let selected;
  //   if (cardIndex === arr.length - 1) {
  //     selected = arr.splice(cardIndex, 1);
  //   } else {
  //     const last = arr.pop();
  //     selected = arr.splice(cardIndex, 1, last);
  //   }
  //   player.cards.push(...selected);
  //   playerState[turn] = player;
  //   setPlayerState(playerState);
  //   setStack(arr);
  // };
  // };

  const onCoinSelect = (color: GlobalTypes.GemColor) => {
    console.log(color);
    // if (bankState[gemColor] > 0) {
    //   player.coins[gemColor] = player.coins[gemColor] + 1;
    //   playerState[turn] = player;
    //   setPlayerState(playerState);
    //   setBankState({ ...bankState, [gemColor]: bankState[gemColor] - 1 });
    // }
  };

  const { state, players, bank, stacks, id: gameId } = data.game;
  if (players.length === 0) return <div>Waiting for players to join....</div>;

  return (
    <>
      <div>Game state: {state}</div>
      <div>Players: {players.map((p) => p.id).join(', ')}</div>
      <div style={{ padding: 40, display: 'flex' }}>
        <div style={{ flex: 'none' }}>
          {stacks.map(({ type, cards, remaining }) =>
            type === 'NOBLE' ? (
              <div key="NOBLE" style={{ display: 'flex' }}>
                {cards.map((card, i) => (
                  <NobleCard key={`${type}-${i}`} card={card} />
                ))}
              </div>
            ) : (
              <CardRowAndStack
                key={type}
                cards={cards}
                remaining={remaining}
                level={type === 'I' ? 1 : type === 'II' ? 2 : 3}
                gameId={gameId}
                playerId={players[0].id}
              />
            )
          )}
        </div>

        <div style={{ flex: 'none' }}>
          {bank.map(({ gemColor, quantity }) => (
            <CoinStack
              key={gemColor}
              color={gemColor}
              quantity={quantity}
              onSelect={onCoinSelect}
            />
          ))}
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: '#cccccc',
            padding: 8,
          }}
        >
          {players.map((player) => (
            <div key={player.id}>
              <div>{player.id}</div>
              <div>
                {player.bank.map(({ gemColor, quantity }) => (
                  <CoinStack
                    key={gemColor}
                    color={gemColor}
                    quantity={quantity}
                    onSelect={onCoinSelect}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
