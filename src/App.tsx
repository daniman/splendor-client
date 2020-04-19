import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { players } from './config/state';
import { NobleCard } from './components/NobleCard';
import { CoinStack } from './components/CoinStack';
import { CardRowAndStack } from './components/CardRowAndStack';
// import { PlayerView } from '../components/PlayerView';

import * as GameBoardTypes from '../__generated__/GameBoard';
import * as GlobalTypes from '../__generated__/globalTypes';

export const App: React.FC = () => {
  const { data, loading, error } = useQuery<GameBoardTypes.GameBoard>(gql`
    query GameBoard {
      game(id: "8171") {
        id
        name
        bank {
          gemColor
          quantity
        }
        cards {
          I {
            ...CardSelection
          }
          II {
            ...CardSelection
          }
          III {
            ...CardSelection
          }
          Noble {
            ...CardSelection
          }
        }
      }
    }

    fragment CardSelection on Card {
      id
      gemColor
      pointValue
      cost {
        gemColor
        quantity
      }
    }
  `);

  const [playerState, setPlayerState] = useState(players);
  const [player, setPlayer] = useState(playerState[0]);

  if (loading || error) return <div>nothing to see here :(</div>;
  if (!data || !data.game) return <div>no game found :(</div>;

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

  return (
    <div style={{ padding: 40, display: 'flex' }}>
      <div style={{ flex: 'none' }}>
        <div style={{ display: 'flex' }}>
          {data.game.cards.Noble.slice(0, 5).map((card, i) => (
            <NobleCard key={i} card={card} />
          ))}
        </div>
        <CardRowAndStack
          cards={data.game.cards.III}
          level={3}
          // onSelect={onCardSelect(tierIIICardState, setTierIIICardState)}
        />
        <CardRowAndStack
          cards={data.game.cards.II}
          level={2}
          // onSelect={onCardSelect(tierIICardState, setTierIICardState)}
        />
        <CardRowAndStack
          cards={data.game.cards.I}
          level={1}
          // onSelect={onCardSelect(tierICardState, setTierICardState)}
        />
      </div>

      <div style={{ flex: 'none' }}>
        {data.game.bank.map(({ gemColor, quantity }) => (
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
        <div>
          <b>Turn:</b> {player.name}
        </div>

        {/* <div style={{ display: 'flex' }}>
          <Bank state={player.coins} onChange={onCoinSelect} />
        </div> */}

        {/* <PlayerView player={player} /> */}
      </div>
    </div>
  );
};
