import * as Types from '../types';

export const canSelectFromBank = (
  color: Types.GemColor,
  turnCoinState: Types.GemColor[],
  playerBank: Types.GameBoard_game_currentTurn_bank[] | undefined,
  bank: Types.GameBoard_game_bank[] | undefined,
  returnCoinState: Types.GemColor[] ) => {
  let msg;
  const playerTotalCoins = playerBank ? playerBank.reduce((accumulator, el) => accumulator + el.quantity,0) : 0;
  //const bankCoinsOfColor = bank ? bank.reduce((accumulator,el) => el.gemColor === color ? accumulator + el.quantity : 0,0) : 0;
  
  // disallow picking yellow
  if (color === 'YELLOW') msg = "Can't pick yellow coins directly, need to reserve a card!";
  
  // if user has already picked two coins of the same color don't allow a 3rd pick
  if (turnCoinState.length === 2 && turnCoinState[0] === turnCoinState[1]) msg = "Can't pick a 3rd coin when you've already picked 2 coins of the same color!";

  // disallow picking a 3rd coin if it's the same color as an existing coin
  if (turnCoinState.length === 2 && turnCoinState.includes(color)) msg = "If you pick 2 coins of the same color you can't pick a 3rd!";
  
  // disallow picking a 4th coin
  if (turnCoinState.length === 3) msg = "Can only pick 3 total coins!";

  // disallow picking coins that would take the total over 10
  if (playerTotalCoins + turnCoinState.length - returnCoinState.length > 10) msg = "Can't bring your total coins to more than 10. Try returning some coins!"

  const err = !!msg;

  //if (err) alert(msg)
  return {err, msg};
}
