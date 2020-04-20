/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GameState, GemColor, CardStackType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GameBoard
// ====================================================

export interface GameBoard_game_players_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_players {
  __typename: "Player";
  id: string;
  bank: GameBoard_game_players_bank[];
}

export interface GameBoard_game_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_stacks_cards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_stacks_cards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameBoard_game_stacks_cards_cost[];
}

export interface GameBoard_game_stacks {
  __typename: "CardStack";
  type: CardStackType;
  remaining: number;
  cards: GameBoard_game_stacks_cards[];
}

export interface GameBoard_game {
  __typename: "Game";
  id: string;
  name: string;
  state: GameState;
  players: GameBoard_game_players[];
  bank: GameBoard_game_bank[];
  stacks: GameBoard_game_stacks[];
}

export interface GameBoard {
  game: GameBoard_game | null;
}
