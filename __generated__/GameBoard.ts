/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GemColor } from "./globalTypes";

// ====================================================
// GraphQL query operation: GameBoard
// ====================================================

export interface GameBoard_game_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_cards_I_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_cards_I {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameBoard_game_cards_I_cost[];
}

export interface GameBoard_game_cards_II_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_cards_II {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameBoard_game_cards_II_cost[];
}

export interface GameBoard_game_cards_III_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_cards_III {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameBoard_game_cards_III_cost[];
}

export interface GameBoard_game_cards_Noble_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_cards_Noble {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameBoard_game_cards_Noble_cost[];
}

export interface GameBoard_game_cards {
  __typename: "CardStack";
  I: GameBoard_game_cards_I[];
  II: GameBoard_game_cards_II[];
  III: GameBoard_game_cards_III[];
  Noble: GameBoard_game_cards_Noble[];
}

export interface GameBoard_game {
  __typename: "Game";
  id: string;
  name: string;
  bank: GameBoard_game_bank[];
  cards: GameBoard_game_cards;
}

export interface GameBoard {
  game: GameBoard_game | null;
}
