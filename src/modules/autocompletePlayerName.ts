import * as Types from '../types';

export const autocompletePlayerName = (
  text: string,
  players: Types.GameBoard_game_players[]
) => {
  let nFound = 0,
    matchingPlayer = '';
  players.forEach((el) => {
    if(el.id.includes(text)){
      nFound +=1;
      matchingPlayer = el.id;
    }
  });
  if (nFound === 1) return matchingPlayer;
  else return '';
};
