// module to determine whether or not the current player can buy a given card
import * as Types from '../types';

export const canBuy = (
  cost: Types.CardSelection_cost[], 
  me: Types.GameBoard_game_players & { purchasingPower: Record<Types.GemColor, number> }
  ) => {

    let wildcards = me.purchasingPower['YELLOW'];
    cost.forEach(el => {
      wildcards -= Math.max(el.quantity - me.purchasingPower[el.gemColor],0);
    })
    return (wildcards >= 0);
}
