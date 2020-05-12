/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GameBoard
// ====================================================

export interface GameBoard_game_currentTurn_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_currentTurn_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_currentTurn_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameBoard_game_currentTurn_nobles_cost[];
}

export interface GameBoard_game_currentTurn_reservedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_currentTurn_reservedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameBoard_game_currentTurn_reservedCards_cost[];
}

export interface GameBoard_game_currentTurn_purchasedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameBoard_game_currentTurn_purchasedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameBoard_game_currentTurn_purchasedCards_cost[];
}

export interface GameBoard_game_currentTurn {
  __typename: "Player";
  id: string;
  score: number;
  bank: GameBoard_game_currentTurn_bank[];
  nobles: GameBoard_game_currentTurn_nobles[];
  reservedCards: (GameBoard_game_currentTurn_reservedCards | null)[];
  purchasedCards: GameBoard_game_currentTurn_purchasedCards[];
}

export interface GameBoard_game_turns_TakeGems {
  __typename: "TakeGems";
  playerId: string;
  type: TurnType;
  when: string;
  gems: GemColor[];
}

export interface GameBoard_game_turns_PurchaseCard_card {
  __typename: "Card";
  gemColor: GemColor | null;
}

export interface GameBoard_game_turns_PurchaseCard {
  __typename: "PurchaseCard";
  playerId: string;
  type: TurnType;
  when: string;
  card: GameBoard_game_turns_PurchaseCard_card | null;
}

export interface GameBoard_game_turns_ReserveCard_card {
  __typename: "Card";
  pointValue: number;
  gemColor: GemColor | null;
}

export interface GameBoard_game_turns_ReserveCard {
  __typename: "ReserveCard";
  playerId: string;
  type: TurnType;
  when: string;
  cardType: CardStackType | null;
  card: GameBoard_game_turns_ReserveCard_card | null;
}

export type GameBoard_game_turns = GameBoard_game_turns_TakeGems | GameBoard_game_turns_PurchaseCard | GameBoard_game_turns_ReserveCard;

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
  reservedCards: (GameBoard_game_players_reservedCards | null)[];
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
  currentTurn: GameBoard_game_currentTurn | null;
  turns: GameBoard_game_turns[];
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
  playerId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GamePage
// ====================================================

export interface GamePage_game_currentTurn {
  __typename: "Player";
  id: string;
}

export interface GamePage_game_turns {
  __typename: "PurchaseCard" | "ReserveCard" | "TakeGems";
  when: string;
}

export interface GamePage_game {
  __typename: "Game";
  id: string;
  name: string;
  state: GameState;
  currentTurn: GamePage_game_currentTurn | null;
  turns: GamePage_game_turns[];
}

export interface GamePage {
  game: GamePage_game | null;
}

export interface GamePageVariables {
  gameId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllGames
// ====================================================

export interface AllGames_allGames_players {
  __typename: "Player";
  id: string;
}

export interface AllGames_allGames {
  __typename: "Game";
  id: string;
  name: string;
  state: GameState;
  players: AllGames_allGames_players[];
}

export interface AllGames {
  allGames: AllGames_allGames[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateGame
// ====================================================

export interface CreateGame_newGame {
  __typename: "Game";
  id: string;
  name: string;
}

export interface CreateGame {
  newGame: CreateGame_newGame | null;
}

export interface CreateGameVariables {
  name: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
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
  name: string;
  state: GameState;
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
// @generated
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
// @generated
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
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TakeCoins
// ====================================================

export interface TakeCoins_game_takeTurn_currentTurn_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface TakeCoins_game_takeTurn_currentTurn_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface TakeCoins_game_takeTurn_currentTurn_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: TakeCoins_game_takeTurn_currentTurn_nobles_cost[];
}

export interface TakeCoins_game_takeTurn_currentTurn_reservedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface TakeCoins_game_takeTurn_currentTurn_reservedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: TakeCoins_game_takeTurn_currentTurn_reservedCards_cost[];
}

export interface TakeCoins_game_takeTurn_currentTurn_purchasedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface TakeCoins_game_takeTurn_currentTurn_purchasedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: TakeCoins_game_takeTurn_currentTurn_purchasedCards_cost[];
}

export interface TakeCoins_game_takeTurn_currentTurn {
  __typename: "Player";
  id: string;
  score: number;
  bank: TakeCoins_game_takeTurn_currentTurn_bank[];
  nobles: TakeCoins_game_takeTurn_currentTurn_nobles[];
  reservedCards: (TakeCoins_game_takeTurn_currentTurn_reservedCards | null)[];
  purchasedCards: TakeCoins_game_takeTurn_currentTurn_purchasedCards[];
}

export interface TakeCoins_game_takeTurn_turns_TakeGems {
  __typename: "TakeGems";
  playerId: string;
  type: TurnType;
  when: string;
  gems: GemColor[];
}

export interface TakeCoins_game_takeTurn_turns_PurchaseCard_card {
  __typename: "Card";
  gemColor: GemColor | null;
}

export interface TakeCoins_game_takeTurn_turns_PurchaseCard {
  __typename: "PurchaseCard";
  playerId: string;
  type: TurnType;
  when: string;
  card: TakeCoins_game_takeTurn_turns_PurchaseCard_card | null;
}

export interface TakeCoins_game_takeTurn_turns_ReserveCard_card {
  __typename: "Card";
  pointValue: number;
  gemColor: GemColor | null;
}

export interface TakeCoins_game_takeTurn_turns_ReserveCard {
  __typename: "ReserveCard";
  playerId: string;
  type: TurnType;
  when: string;
  cardType: CardStackType | null;
  card: TakeCoins_game_takeTurn_turns_ReserveCard_card | null;
}

export type TakeCoins_game_takeTurn_turns = TakeCoins_game_takeTurn_turns_TakeGems | TakeCoins_game_takeTurn_turns_PurchaseCard | TakeCoins_game_takeTurn_turns_ReserveCard;

export interface TakeCoins_game_takeTurn_players_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface TakeCoins_game_takeTurn_players_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface TakeCoins_game_takeTurn_players_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: TakeCoins_game_takeTurn_players_nobles_cost[];
}

export interface TakeCoins_game_takeTurn_players_reservedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface TakeCoins_game_takeTurn_players_reservedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: TakeCoins_game_takeTurn_players_reservedCards_cost[];
}

export interface TakeCoins_game_takeTurn_players_purchasedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface TakeCoins_game_takeTurn_players_purchasedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: TakeCoins_game_takeTurn_players_purchasedCards_cost[];
}

export interface TakeCoins_game_takeTurn_players {
  __typename: "Player";
  id: string;
  score: number;
  bank: TakeCoins_game_takeTurn_players_bank[];
  nobles: TakeCoins_game_takeTurn_players_nobles[];
  reservedCards: (TakeCoins_game_takeTurn_players_reservedCards | null)[];
  purchasedCards: TakeCoins_game_takeTurn_players_purchasedCards[];
}

export interface TakeCoins_game_takeTurn_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface TakeCoins_game_takeTurn_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface TakeCoins_game_takeTurn_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: TakeCoins_game_takeTurn_nobles_cost[];
}

export interface TakeCoins_game_takeTurn_cardStacks_cards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface TakeCoins_game_takeTurn_cardStacks_cards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: TakeCoins_game_takeTurn_cardStacks_cards_cost[];
}

export interface TakeCoins_game_takeTurn_cardStacks {
  __typename: "CardStack";
  type: CardStackType;
  remaining: number;
  cards: TakeCoins_game_takeTurn_cardStacks_cards[];
}

export interface TakeCoins_game_takeTurn {
  __typename: "Game";
  id: string;
  name: string;
  state: GameState;
  currentTurn: TakeCoins_game_takeTurn_currentTurn | null;
  turns: TakeCoins_game_takeTurn_turns[];
  players: TakeCoins_game_takeTurn_players[];
  bank: TakeCoins_game_takeTurn_bank[];
  nobles: TakeCoins_game_takeTurn_nobles[];
  cardStacks: TakeCoins_game_takeTurn_cardStacks[];
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
  returnGemList?: GemColor[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ReserveCard
// ====================================================

export interface ReserveCard_game_takeTurn_currentTurn_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCard_game_takeTurn_currentTurn_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCard_game_takeTurn_currentTurn_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: ReserveCard_game_takeTurn_currentTurn_nobles_cost[];
}

export interface ReserveCard_game_takeTurn_currentTurn_reservedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCard_game_takeTurn_currentTurn_reservedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: ReserveCard_game_takeTurn_currentTurn_reservedCards_cost[];
}

export interface ReserveCard_game_takeTurn_currentTurn_purchasedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCard_game_takeTurn_currentTurn_purchasedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: ReserveCard_game_takeTurn_currentTurn_purchasedCards_cost[];
}

export interface ReserveCard_game_takeTurn_currentTurn {
  __typename: "Player";
  id: string;
  score: number;
  bank: ReserveCard_game_takeTurn_currentTurn_bank[];
  nobles: ReserveCard_game_takeTurn_currentTurn_nobles[];
  reservedCards: (ReserveCard_game_takeTurn_currentTurn_reservedCards | null)[];
  purchasedCards: ReserveCard_game_takeTurn_currentTurn_purchasedCards[];
}

export interface ReserveCard_game_takeTurn_turns_TakeGems {
  __typename: "TakeGems";
  playerId: string;
  type: TurnType;
  when: string;
  gems: GemColor[];
}

export interface ReserveCard_game_takeTurn_turns_PurchaseCard_card {
  __typename: "Card";
  gemColor: GemColor | null;
}

export interface ReserveCard_game_takeTurn_turns_PurchaseCard {
  __typename: "PurchaseCard";
  playerId: string;
  type: TurnType;
  when: string;
  card: ReserveCard_game_takeTurn_turns_PurchaseCard_card | null;
}

export interface ReserveCard_game_takeTurn_turns_ReserveCard_card {
  __typename: "Card";
  pointValue: number;
  gemColor: GemColor | null;
}

export interface ReserveCard_game_takeTurn_turns_ReserveCard {
  __typename: "ReserveCard";
  playerId: string;
  type: TurnType;
  when: string;
  cardType: CardStackType | null;
  card: ReserveCard_game_takeTurn_turns_ReserveCard_card | null;
}

export type ReserveCard_game_takeTurn_turns = ReserveCard_game_takeTurn_turns_TakeGems | ReserveCard_game_takeTurn_turns_PurchaseCard | ReserveCard_game_takeTurn_turns_ReserveCard;

export interface ReserveCard_game_takeTurn_players_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCard_game_takeTurn_players_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCard_game_takeTurn_players_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: ReserveCard_game_takeTurn_players_nobles_cost[];
}

export interface ReserveCard_game_takeTurn_players_reservedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCard_game_takeTurn_players_reservedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: ReserveCard_game_takeTurn_players_reservedCards_cost[];
}

export interface ReserveCard_game_takeTurn_players_purchasedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCard_game_takeTurn_players_purchasedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: ReserveCard_game_takeTurn_players_purchasedCards_cost[];
}

export interface ReserveCard_game_takeTurn_players {
  __typename: "Player";
  id: string;
  score: number;
  bank: ReserveCard_game_takeTurn_players_bank[];
  nobles: ReserveCard_game_takeTurn_players_nobles[];
  reservedCards: (ReserveCard_game_takeTurn_players_reservedCards | null)[];
  purchasedCards: ReserveCard_game_takeTurn_players_purchasedCards[];
}

export interface ReserveCard_game_takeTurn_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCard_game_takeTurn_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCard_game_takeTurn_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: ReserveCard_game_takeTurn_nobles_cost[];
}

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

export interface ReserveCard_game_takeTurn {
  __typename: "Game";
  id: string;
  name: string;
  state: GameState;
  currentTurn: ReserveCard_game_takeTurn_currentTurn | null;
  turns: ReserveCard_game_takeTurn_turns[];
  players: ReserveCard_game_takeTurn_players[];
  bank: ReserveCard_game_takeTurn_bank[];
  nobles: ReserveCard_game_takeTurn_nobles[];
  cardStacks: ReserveCard_game_takeTurn_cardStacks[];
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
  returnGemList?: GemColor[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ReserveCardFromStack
// ====================================================

export interface ReserveCardFromStack_game_takeTurn_currentTurn_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCardFromStack_game_takeTurn_currentTurn_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCardFromStack_game_takeTurn_currentTurn_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: ReserveCardFromStack_game_takeTurn_currentTurn_nobles_cost[];
}

export interface ReserveCardFromStack_game_takeTurn_currentTurn_reservedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCardFromStack_game_takeTurn_currentTurn_reservedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: ReserveCardFromStack_game_takeTurn_currentTurn_reservedCards_cost[];
}

export interface ReserveCardFromStack_game_takeTurn_currentTurn_purchasedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCardFromStack_game_takeTurn_currentTurn_purchasedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: ReserveCardFromStack_game_takeTurn_currentTurn_purchasedCards_cost[];
}

export interface ReserveCardFromStack_game_takeTurn_currentTurn {
  __typename: "Player";
  id: string;
  score: number;
  bank: ReserveCardFromStack_game_takeTurn_currentTurn_bank[];
  nobles: ReserveCardFromStack_game_takeTurn_currentTurn_nobles[];
  reservedCards: (ReserveCardFromStack_game_takeTurn_currentTurn_reservedCards | null)[];
  purchasedCards: ReserveCardFromStack_game_takeTurn_currentTurn_purchasedCards[];
}

export interface ReserveCardFromStack_game_takeTurn_turns_TakeGems {
  __typename: "TakeGems";
  playerId: string;
  type: TurnType;
  when: string;
  gems: GemColor[];
}

export interface ReserveCardFromStack_game_takeTurn_turns_PurchaseCard_card {
  __typename: "Card";
  gemColor: GemColor | null;
}

export interface ReserveCardFromStack_game_takeTurn_turns_PurchaseCard {
  __typename: "PurchaseCard";
  playerId: string;
  type: TurnType;
  when: string;
  card: ReserveCardFromStack_game_takeTurn_turns_PurchaseCard_card | null;
}

export interface ReserveCardFromStack_game_takeTurn_turns_ReserveCard_card {
  __typename: "Card";
  pointValue: number;
  gemColor: GemColor | null;
}

export interface ReserveCardFromStack_game_takeTurn_turns_ReserveCard {
  __typename: "ReserveCard";
  playerId: string;
  type: TurnType;
  when: string;
  cardType: CardStackType | null;
  card: ReserveCardFromStack_game_takeTurn_turns_ReserveCard_card | null;
}

export type ReserveCardFromStack_game_takeTurn_turns = ReserveCardFromStack_game_takeTurn_turns_TakeGems | ReserveCardFromStack_game_takeTurn_turns_PurchaseCard | ReserveCardFromStack_game_takeTurn_turns_ReserveCard;

export interface ReserveCardFromStack_game_takeTurn_players_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCardFromStack_game_takeTurn_players_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCardFromStack_game_takeTurn_players_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: ReserveCardFromStack_game_takeTurn_players_nobles_cost[];
}

export interface ReserveCardFromStack_game_takeTurn_players_reservedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCardFromStack_game_takeTurn_players_reservedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: ReserveCardFromStack_game_takeTurn_players_reservedCards_cost[];
}

export interface ReserveCardFromStack_game_takeTurn_players_purchasedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCardFromStack_game_takeTurn_players_purchasedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: ReserveCardFromStack_game_takeTurn_players_purchasedCards_cost[];
}

export interface ReserveCardFromStack_game_takeTurn_players {
  __typename: "Player";
  id: string;
  score: number;
  bank: ReserveCardFromStack_game_takeTurn_players_bank[];
  nobles: ReserveCardFromStack_game_takeTurn_players_nobles[];
  reservedCards: (ReserveCardFromStack_game_takeTurn_players_reservedCards | null)[];
  purchasedCards: ReserveCardFromStack_game_takeTurn_players_purchasedCards[];
}

export interface ReserveCardFromStack_game_takeTurn_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCardFromStack_game_takeTurn_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCardFromStack_game_takeTurn_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: ReserveCardFromStack_game_takeTurn_nobles_cost[];
}

export interface ReserveCardFromStack_game_takeTurn_cardStacks_cards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface ReserveCardFromStack_game_takeTurn_cardStacks_cards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: ReserveCardFromStack_game_takeTurn_cardStacks_cards_cost[];
}

export interface ReserveCardFromStack_game_takeTurn_cardStacks {
  __typename: "CardStack";
  type: CardStackType;
  remaining: number;
  cards: ReserveCardFromStack_game_takeTurn_cardStacks_cards[];
}

export interface ReserveCardFromStack_game_takeTurn {
  __typename: "Game";
  id: string;
  name: string;
  state: GameState;
  currentTurn: ReserveCardFromStack_game_takeTurn_currentTurn | null;
  turns: ReserveCardFromStack_game_takeTurn_turns[];
  players: ReserveCardFromStack_game_takeTurn_players[];
  bank: ReserveCardFromStack_game_takeTurn_bank[];
  nobles: ReserveCardFromStack_game_takeTurn_nobles[];
  cardStacks: ReserveCardFromStack_game_takeTurn_cardStacks[];
}

export interface ReserveCardFromStack_game {
  __typename: "GameMutation";
  takeTurn: ReserveCardFromStack_game_takeTurn | null;
}

export interface ReserveCardFromStack {
  game: ReserveCardFromStack_game | null;
}

export interface ReserveCardFromStackVariables {
  gameId: string;
  playerId: string;
  stack?: CardStackType | null;
  returnGemList?: GemColor[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PurchaseCard
// ====================================================

export interface PurchaseCard_game_takeTurn_currentTurn_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PurchaseCard_game_takeTurn_currentTurn_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PurchaseCard_game_takeTurn_currentTurn_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: PurchaseCard_game_takeTurn_currentTurn_nobles_cost[];
}

export interface PurchaseCard_game_takeTurn_currentTurn_reservedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PurchaseCard_game_takeTurn_currentTurn_reservedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: PurchaseCard_game_takeTurn_currentTurn_reservedCards_cost[];
}

export interface PurchaseCard_game_takeTurn_currentTurn_purchasedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PurchaseCard_game_takeTurn_currentTurn_purchasedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: PurchaseCard_game_takeTurn_currentTurn_purchasedCards_cost[];
}

export interface PurchaseCard_game_takeTurn_currentTurn {
  __typename: "Player";
  id: string;
  score: number;
  bank: PurchaseCard_game_takeTurn_currentTurn_bank[];
  nobles: PurchaseCard_game_takeTurn_currentTurn_nobles[];
  reservedCards: (PurchaseCard_game_takeTurn_currentTurn_reservedCards | null)[];
  purchasedCards: PurchaseCard_game_takeTurn_currentTurn_purchasedCards[];
}

export interface PurchaseCard_game_takeTurn_turns_TakeGems {
  __typename: "TakeGems";
  playerId: string;
  type: TurnType;
  when: string;
  gems: GemColor[];
}

export interface PurchaseCard_game_takeTurn_turns_PurchaseCard_card {
  __typename: "Card";
  gemColor: GemColor | null;
}

export interface PurchaseCard_game_takeTurn_turns_PurchaseCard {
  __typename: "PurchaseCard";
  playerId: string;
  type: TurnType;
  when: string;
  card: PurchaseCard_game_takeTurn_turns_PurchaseCard_card | null;
}

export interface PurchaseCard_game_takeTurn_turns_ReserveCard_card {
  __typename: "Card";
  pointValue: number;
  gemColor: GemColor | null;
}

export interface PurchaseCard_game_takeTurn_turns_ReserveCard {
  __typename: "ReserveCard";
  playerId: string;
  type: TurnType;
  when: string;
  cardType: CardStackType | null;
  card: PurchaseCard_game_takeTurn_turns_ReserveCard_card | null;
}

export type PurchaseCard_game_takeTurn_turns = PurchaseCard_game_takeTurn_turns_TakeGems | PurchaseCard_game_takeTurn_turns_PurchaseCard | PurchaseCard_game_takeTurn_turns_ReserveCard;

export interface PurchaseCard_game_takeTurn_players_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PurchaseCard_game_takeTurn_players_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PurchaseCard_game_takeTurn_players_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: PurchaseCard_game_takeTurn_players_nobles_cost[];
}

export interface PurchaseCard_game_takeTurn_players_reservedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PurchaseCard_game_takeTurn_players_reservedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: PurchaseCard_game_takeTurn_players_reservedCards_cost[];
}

export interface PurchaseCard_game_takeTurn_players_purchasedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PurchaseCard_game_takeTurn_players_purchasedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: PurchaseCard_game_takeTurn_players_purchasedCards_cost[];
}

export interface PurchaseCard_game_takeTurn_players {
  __typename: "Player";
  id: string;
  score: number;
  bank: PurchaseCard_game_takeTurn_players_bank[];
  nobles: PurchaseCard_game_takeTurn_players_nobles[];
  reservedCards: (PurchaseCard_game_takeTurn_players_reservedCards | null)[];
  purchasedCards: PurchaseCard_game_takeTurn_players_purchasedCards[];
}

export interface PurchaseCard_game_takeTurn_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
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

export interface PurchaseCard_game_takeTurn {
  __typename: "Game";
  id: string;
  name: string;
  state: GameState;
  currentTurn: PurchaseCard_game_takeTurn_currentTurn | null;
  turns: PurchaseCard_game_takeTurn_turns[];
  players: PurchaseCard_game_takeTurn_players[];
  bank: PurchaseCard_game_takeTurn_bank[];
  nobles: PurchaseCard_game_takeTurn_nobles[];
  cardStacks: PurchaseCard_game_takeTurn_cardStacks[];
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
// @generated
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
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PlayerSelection
// ====================================================

export interface PlayerSelection_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PlayerSelection_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PlayerSelection_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: PlayerSelection_nobles_cost[];
}

export interface PlayerSelection_reservedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PlayerSelection_reservedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: PlayerSelection_reservedCards_cost[];
}

export interface PlayerSelection_purchasedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface PlayerSelection_purchasedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: PlayerSelection_purchasedCards_cost[];
}

export interface PlayerSelection {
  __typename: "Player";
  id: string;
  score: number;
  bank: PlayerSelection_bank[];
  nobles: PlayerSelection_nobles[];
  reservedCards: (PlayerSelection_reservedCards | null)[];
  purchasedCards: PlayerSelection_purchasedCards[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GameSelection
// ====================================================

export interface GameSelection_currentTurn_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameSelection_currentTurn_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameSelection_currentTurn_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameSelection_currentTurn_nobles_cost[];
}

export interface GameSelection_currentTurn_reservedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameSelection_currentTurn_reservedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameSelection_currentTurn_reservedCards_cost[];
}

export interface GameSelection_currentTurn_purchasedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameSelection_currentTurn_purchasedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameSelection_currentTurn_purchasedCards_cost[];
}

export interface GameSelection_currentTurn {
  __typename: "Player";
  id: string;
  score: number;
  bank: GameSelection_currentTurn_bank[];
  nobles: GameSelection_currentTurn_nobles[];
  reservedCards: (GameSelection_currentTurn_reservedCards | null)[];
  purchasedCards: GameSelection_currentTurn_purchasedCards[];
}

export interface GameSelection_turns_TakeGems {
  __typename: "TakeGems";
  playerId: string;
  type: TurnType;
  when: string;
  gems: GemColor[];
}

export interface GameSelection_turns_PurchaseCard_card {
  __typename: "Card";
  gemColor: GemColor | null;
}

export interface GameSelection_turns_PurchaseCard {
  __typename: "PurchaseCard";
  playerId: string;
  type: TurnType;
  when: string;
  card: GameSelection_turns_PurchaseCard_card | null;
}

export interface GameSelection_turns_ReserveCard_card {
  __typename: "Card";
  pointValue: number;
  gemColor: GemColor | null;
}

export interface GameSelection_turns_ReserveCard {
  __typename: "ReserveCard";
  playerId: string;
  type: TurnType;
  when: string;
  cardType: CardStackType | null;
  card: GameSelection_turns_ReserveCard_card | null;
}

export type GameSelection_turns = GameSelection_turns_TakeGems | GameSelection_turns_PurchaseCard | GameSelection_turns_ReserveCard;

export interface GameSelection_players_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameSelection_players_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameSelection_players_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameSelection_players_nobles_cost[];
}

export interface GameSelection_players_reservedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameSelection_players_reservedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameSelection_players_reservedCards_cost[];
}

export interface GameSelection_players_purchasedCards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameSelection_players_purchasedCards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameSelection_players_purchasedCards_cost[];
}

export interface GameSelection_players {
  __typename: "Player";
  id: string;
  score: number;
  bank: GameSelection_players_bank[];
  nobles: GameSelection_players_nobles[];
  reservedCards: (GameSelection_players_reservedCards | null)[];
  purchasedCards: GameSelection_players_purchasedCards[];
}

export interface GameSelection_bank {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameSelection_nobles_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameSelection_nobles {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameSelection_nobles_cost[];
}

export interface GameSelection_cardStacks_cards_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface GameSelection_cardStacks_cards {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: GameSelection_cardStacks_cards_cost[];
}

export interface GameSelection_cardStacks {
  __typename: "CardStack";
  type: CardStackType;
  remaining: number;
  cards: GameSelection_cardStacks_cards[];
}

export interface GameSelection {
  __typename: "Game";
  id: string;
  name: string;
  state: GameState;
  currentTurn: GameSelection_currentTurn | null;
  turns: GameSelection_turns[];
  players: GameSelection_players[];
  bank: GameSelection_bank[];
  nobles: GameSelection_nobles[];
  cardStacks: GameSelection_cardStacks[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
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

export enum TurnType {
  PURCHASE_CARD = "PURCHASE_CARD",
  RESERVE_CARD = "RESERVE_CARD",
  TAKE_GEMS = "TAKE_GEMS",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
