/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GamePage
// ====================================================

export interface GamePage_game {
  __typename: "Game";
  id: string;
  name: string;
  state: GameState;
}

export interface GamePage {
  game: GamePage_game | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GameBoard
// ====================================================

export interface GameBoard_game_players_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_players_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_players_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameBoard_game_players_nobles_cost[];
}

export interface GameBoard_game_players_reservedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_players_reservedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameBoard_game_players_reservedCards_cost[];
}

export interface GameBoard_game_players_purchasedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_players_purchasedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameBoard_game_players_purchasedCards_cost[];
}

export interface GameBoard_game_players {
  __typename: "Player";
  id: string;
  score: number;
  bank: GameBoard_game_players_bank[];
  nobles: GameBoard_game_players_nobles[];
  reservedCards: GameBoard_game_players_reservedCards[];
  purchasedCards: GameBoard_game_players_purchasedCards[];
}

export interface GameBoard_game_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameBoard_game_nobles_cost[];
}

export interface GameBoard_game_cardStacks_cards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_cardStacks_cards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameBoard_game_cardStacks_cards_cost[];
}

export interface GameBoard_game_cardStacks {
  __typename: "CardStack";
  type: CardStackType;
  remaining: number;
  cards: GameBoard_game_cardStacks_cards[];
}

export interface GameBoard_game {
  __typename: "Game";
  id: string;
  name: string;
  state: GameState;
  /**
   * The players in the game; returned in order of ranking.
   * Ordering: 1st place, 2nd place, etc.
   */
  players: GameBoard_game_players[];
  bank: GameBoard_game_bank[];
  nobles: GameBoard_game_nobles[];
  cardStacks: GameBoard_game_cardStacks[];
}

export interface GameBoard {
  game: GameBoard_game | null;
}

export interface GameBoardVariables {
  gameId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TakeCoins
// ====================================================

export interface TakeCoins_game_takeTurn_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface TakeCoins_game_takeTurn_player_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface TakeCoins_game_takeTurn_player {
  __typename: "Player";
  id: string;
  bank: TakeCoins_game_takeTurn_player_bank[];
}

export interface TakeCoins_game_takeTurn {
  __typename: "Game";
  id: string;
  bank: TakeCoins_game_takeTurn_bank[];
  player: TakeCoins_game_takeTurn_player | null;
}

export interface TakeCoins_game {
  __typename: "GameMutation";
  takeTurn: TakeCoins_game_takeTurn | null;
}

export interface TakeCoins {
  game: TakeCoins_game | null;
}

export interface TakeCoinsVariables {
  gameId: string;
  playerId: string;
  gemList?: GemColor[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ReserveCard
// ====================================================

export interface ReserveCard_game_takeTurn_cardStacks_cards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCard_game_takeTurn_cardStacks_cards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: ReserveCard_game_takeTurn_cardStacks_cards_cost[];
}

export interface ReserveCard_game_takeTurn_cardStacks {
  __typename: "CardStack";
  type: CardStackType;
  remaining: number;
  cards: ReserveCard_game_takeTurn_cardStacks_cards[];
}

export interface ReserveCard_game_takeTurn_player_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCard_game_takeTurn_player_reservedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCard_game_takeTurn_player_reservedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: ReserveCard_game_takeTurn_player_reservedCards_cost[];
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
  cardStacks: ReserveCard_game_takeTurn_cardStacks[];
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

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PurchaseCard
// ====================================================

export interface PurchaseCard_game_takeTurn_cardStacks_cards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PurchaseCard_game_takeTurn_cardStacks_cards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: PurchaseCard_game_takeTurn_cardStacks_cards_cost[];
}

export interface PurchaseCard_game_takeTurn_cardStacks {
  __typename: "CardStack";
  type: CardStackType;
  remaining: number;
  cards: PurchaseCard_game_takeTurn_cardStacks_cards[];
}

export interface PurchaseCard_game_takeTurn_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PurchaseCard_game_takeTurn_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: PurchaseCard_game_takeTurn_nobles_cost[];
}

export interface PurchaseCard_game_takeTurn_player_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PurchaseCard_game_takeTurn_player_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PurchaseCard_game_takeTurn_player_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: PurchaseCard_game_takeTurn_player_nobles_cost[];
}

export interface PurchaseCard_game_takeTurn_player_reservedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PurchaseCard_game_takeTurn_player_reservedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: PurchaseCard_game_takeTurn_player_reservedCards_cost[];
}

export interface PurchaseCard_game_takeTurn_player_purchasedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PurchaseCard_game_takeTurn_player_purchasedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: PurchaseCard_game_takeTurn_player_purchasedCards_cost[];
}

export interface PurchaseCard_game_takeTurn_player {
  __typename: "Player";
  id: string;
  score: number;
  bank: PurchaseCard_game_takeTurn_player_bank[];
  nobles: PurchaseCard_game_takeTurn_player_nobles[];
  reservedCards: PurchaseCard_game_takeTurn_player_reservedCards[];
  purchasedCards: PurchaseCard_game_takeTurn_player_purchasedCards[];
}

export interface PurchaseCard_game_takeTurn_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PurchaseCard_game_takeTurn {
  __typename: "Game";
  id: string;
  cardStacks: PurchaseCard_game_takeTurn_cardStacks[];
  nobles: PurchaseCard_game_takeTurn_nobles[];
  player: PurchaseCard_game_takeTurn_player | null;
  bank: PurchaseCard_game_takeTurn_bank[];
}

export interface PurchaseCard_game {
  __typename: "GameMutation";
  takeTurn: PurchaseCard_game_takeTurn | null;
}

export interface PurchaseCard {
  game: PurchaseCard_game | null;
}

export interface PurchaseCardVariables {
  gameId: string;
  playerId: string;
  cardId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Lobby
// ====================================================

export interface Lobby_game_players {
  __typename: "Player";
  id: string;
}

export interface Lobby_game {
  __typename: "Game";
  id: string;
  /**
   * The players in the game; returned in order of ranking.
   * Ordering: 1st place, 2nd place, etc.
   */
  players: Lobby_game_players[];
}

export interface Lobby {
  game: Lobby_game | null;
}

export interface LobbyVariables {
  gameId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: JoinGame
// ====================================================

export interface JoinGame_game_join_players {
  __typename: "Player";
  id: string;
}

export interface JoinGame_game_join {
  __typename: "Game";
  id: string;
  /**
   * The players in the game; returned in order of ranking.
   * Ordering: 1st place, 2nd place, etc.
   */
  players: JoinGame_game_join_players[];
}

export interface JoinGame_game {
  __typename: "GameMutation";
  join: JoinGame_game_join | null;
}

export interface JoinGame {
  game: JoinGame_game | null;
}

export interface JoinGameVariables {
  gameId: string;
  playerId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: StartGame
// ====================================================

export interface StartGame_game_start {
  __typename: "Game";
  id: string;
  state: GameState;
}

export interface StartGame_game {
  __typename: "GameMutation";
  start: StartGame_game_start | null;
}

export interface StartGame {
  game: StartGame_game | null;
}

export interface StartGameVariables {
  gameId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CardSelection
// ====================================================

export interface CardSelection_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface CardSelection {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: CardSelection_cost[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum CardStackType {
  I = "I",
  II = "II",
  III = "III",
}

export enum GameState {
  ACTIVE = "ACTIVE",
  COMPLETE = "COMPLETE",
  LOBBY = "LOBBY",
}

export enum GemColor {
  BLACK = "BLACK",
  BLUE = "BLUE",
  GREEN = "GREEN",
  RED = "RED",
  WHITE = "WHITE",
  YELLOW = "YELLOW",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
