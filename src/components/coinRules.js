export const canSelectFromBank = (color,turnCoinState,playerBank,bank,returnCoinState) => {
  let msg;
  const playerTotalCoins = playerBank.reduce((accumulator, el) => accumulator + el.quantity,0);
  const bankCoinsOfColor = bank.reduce((accumulator,el) => el.color === color ? accumulator + el.quantity : 0,0);
  
  // disallow picking yellow
  if (color === 'YELLOW') msg = "Can't pick yellow cards directly, need to reserve a card!";
  
  // if user has already picked two coins of the same color don't allow a 3rd pick
  if (turnCoinState.length === 2 && turnCoinState[0] === turnCoinState[1]) msg = "Can't pick a 3rd coin when you've already picked 2 coins of the same color!";

  // disallow picking a 3rd coin if it's the same color as an existing coin
  if (turnCoinState.length === 2 && turnCoinState.includes(color)) msg = "If you pick 2 coins of the same color you can't pick a 3rd!";
  
  // disallow picking a 4th coin
  if (turnCoinState.length === 3) msg = "Can only pick 3 total coins!";

  // disallow picking coins that would take the total over 10
  if (playerTotalCoins + turnCoinState.length - returnCoinState >= 10) msg = "Can't bring your total coins to more than 10. Try returning some coins!"

  // if user already has picked one coin then don't allow a second coin of the same color if there are 3 or less left in the bank
  if (turnCoinState.length === 1 && turnCoinState.includes(color) && bankCoinsOfColor <=3 ) msg = "Can't take two coins of the same color if 3 or less remain!";
  const err = !!msg;

  //if (err) alert(msg)
  return {err, msg};
}
