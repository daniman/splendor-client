import React from 'react';
import { gql } from '@apollo/client';
import { CARD_FRAGMENT } from './Card';
// import { NobleCard } from './components/NobleCard';
// import { CoinStack } from './components/CoinStack';
// import { CardRowAndStack } from './components/CardRowAndStack';

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
      cardStacks {
        type
        remaining
        cards {
          ...CardSelection
        }
      }
    }
  }
  ${CARD_FRAGMENT}
`;

export const GameBoard: React.FC<{ gameId: string }> = ({ gameId }) => {
  return <div>Game board {gameId}</div>;

  // const onCoinSelect = (color: GlobalTypes.GemColor) => {
  //   console.log(color);
  // };

  // const { state, players, bank, stacks, id: gameId } = data.game;

  // // Game state is ACTIVE
  // return (
  //   <>
  //     <div>Game state: {state}</div>
  //     <div>Players: {players.map((p) => p.id).join(', ')}</div>
  //     <div style={{ padding: 40, display: 'flex' }}>
  //       <div style={{ flex: 'none' }}>
  //         {stacks.map(({ type, cards, remaining }) =>
  //           type === 'NOBLE' ? (
  //             <div key="NOBLE" style={{ display: 'flex' }}>
  //               {cards.map((card, i) => (
  //                 <NobleCard key={`${type}-${i}`} card={card} />
  //               ))}
  //             </div>
  //           ) : (
  //             <CardRowAndStack
  //               key={type}
  //               cards={cards}
  //               remaining={remaining}
  //               level={type === 'I' ? 1 : type === 'II' ? 2 : 3}
  //               gameId={gameId}
  //               playerId={players[0].id}
  //             />
  //           )
  //         )}
  //       </div>

  //       <div style={{ flex: 'none' }}>
  //         {bank.map(({ gemColor, quantity }) => (
  //           <CoinStack
  //             key={gemColor}
  //             color={gemColor}
  //             quantity={quantity}
  //             onSelect={onCoinSelect}
  //           />
  //         ))}
  //       </div>

  //       <div
  //         style={{
  //           flex: 1,
  //           backgroundColor: '#cccccc',
  //           padding: 8,
  //         }}
  //       >
  //         {players.map((player) => (
  //           <div key={player.id}>
  //             <div>{player.id}</div>
  //             <div>
  //               {player.bank.map(({ gemColor, quantity }) => (
  //                 <CoinStack
  //                   key={gemColor}
  //                   color={gemColor}
  //                   quantity={quantity}
  //                   onSelect={onCoinSelect}
  //                 />
  //               ))}
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </>
  // );
};
