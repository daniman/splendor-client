// function that computes a player's purchasing resources
// There are two amounts, those for purchasing cards and those for attracting nobles

import * as Types from '../types';

export const playerResources = (
  bank: Types.GameBoard_game_currentTurn_bank[] | undefined,
  purchasedCards: Types.GameBoard_game_currentTurn_purchasedCards[] | undefined
  ) => {

    const purchasingPoints = {'WHITE': 0, 'BLUE': 0, 'GREEN': 0, 'RED': 0, 'BLACK': 0, 'YELLOW': 0};
    const noblePoints = {'WHITE': 0, 'BLUE': 0, 'GREEN': 0, 'RED': 0, 'BLACK': 0, 'YELLOW': 0};
    
    bank?.forEach(el => {
      if (el.gemColor) purchasingPoints[el.gemColor] += el.quantity
    });

    purchasedCards?.forEach(el => {
      if (el.gemColor) purchasingPoints[el.gemColor] += 1;
      if (el.gemColor) noblePoints[el.gemColor] += 1;      
    });

    return { purchasingPoints, noblePoints }
  }
