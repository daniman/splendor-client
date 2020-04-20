/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TurnType, GemColor } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ReserveCard
// ====================================================

export interface ReserveCard_game_takeTurn_turns {
  __typename: "PurchaseCard" | "ReserveCard" | "TakeThreeCoins" | "TakeTwoCoins";
  type: TurnType;
}

export interface ReserveCard_game_takeTurn_stacks_cards {
  __typename: "Card";
  id: string;
}

export interface ReserveCard_game_takeTurn_stacks {
  __typename: "CardStack";
  cards: ReserveCard_game_takeTurn_stacks_cards[];
}

export interface ReserveCard_game_takeTurn_player_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCard_game_takeTurn_player_reservedCards {
  __typename: "Card";
  id: string;
}

export interface ReserveCard_game_takeTurn_player {
  __typename: "Player";
  id: string;
  bank: ReserveCard_game_takeTurn_player_bank[];
  reservedCards: ReserveCard_game_takeTurn_player_reservedCards[];
}

export interface ReserveCard_game_takeTurn_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCard_game_takeTurn {
  __typename: "Game";
  id: string;
  turns: ReserveCard_game_takeTurn_turns[];
  stacks: ReserveCard_game_takeTurn_stacks[];
  player: ReserveCard_game_takeTurn_player | null;
  bank: ReserveCard_game_takeTurn_bank[];
}

export interface ReserveCard_game {
  __typename: "GameMutation";
  takeTurn: ReserveCard_game_takeTurn | null;
}

export interface ReserveCard {
  game: ReserveCard_game | null;
}

export interface ReserveCardVariables {
  gameId: string;
  playerId: string;
  cardId: string;
}
