import React from 'react';
// import { Card } from './Card';

export const PlayerView = () => null;

// export const PlayerView = ({ player }) => {
//   const cardGroups = {};

//   player.cards.forEach((card) => {
//     const groupArr = cardGroups[card.gemColor] || [];
//     groupArr.push(card);
//     cardGroups[card.gemColor] = groupArr;
//   });

//   return (
//     <div style={{ position: 'relative', display: 'flex' }}>
//       {Object.keys(cardGroups).map((key) => (
//         <div style={{ flex: 1 }} key={key}>
//           {cardGroups[key].map((card, i) => (
//             <Card
//               key={i}
//               card={card}
//               style={{ position: 'absolute', top: i * 48 }}
//             />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };
