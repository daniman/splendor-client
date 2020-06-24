import { gql } from '@apollo/client';
import { GAME_FRAGMENT } from './fragments';

const CREATE_GAME_MUTATION = gql`
  mutation CreateGame($name: String!) {
    newGame(name: $name) {
      id
      name
    }
  }
`;

const JOIN_GAME_MUTATION = gql`
  mutation JoinGame($gameId: ID!, $playerId: ID!) {
    game(id: $gameId) {
      join(playerId: $playerId) {
        id
        players {
          id
        }
      }
    }
  }
`;

const PURCHASE_CARD_MUTATION = gql`
  mutation PurchaseCard($gameId: ID!, $playerId: ID!, $cardId: ID!) {
    game(id: $gameId) {
      takeTurn(playerId: $playerId, purchaseCardById: $cardId) {
        ...GameSelection
      }
    }
  }
  ${GAME_FRAGMENT}
`;

const RESERVE_CARD_FROM_STACK_MUTATION = gql`
  mutation ReserveCardFromStack(
    $gameId: ID!
    $playerId: ID!
    $stack: CardStackType
    $returnGemList: [GemColor!]
  ) {
    game(id: $gameId) {
      takeTurn(
        playerId: $playerId
        reserveCardFromStack: $stack
        returnGems: $returnGemList
      ) {
        ...GameSelection
      }
    }
  }
  ${GAME_FRAGMENT}
`;

const RESERVE_CARD_MUTATION = gql`
  mutation ReserveCard(
    $gameId: ID!
    $playerId: ID!
    $cardId: ID!
    $returnGemList: [GemColor!]
  ) {
    game(id: $gameId) {
      takeTurn(
        playerId: $playerId
        reserveCardById: $cardId
        returnGems: $returnGemList
      ) {
        ...GameSelection
      }
    }
  }
  ${GAME_FRAGMENT}
`;

const START_GAME_MUTATION = gql`
  mutation StartGame($gameId: ID!) {
    game(id: $gameId) {
      start {
        id
        state
      }
    }
  }
`;

const TAKE_COINS_MUTATION = gql`
  mutation TakeCoins(
    $gameId: ID!
    $playerId: ID!
    $gemList: [GemColor!]
    $returnGemList: [GemColor!]
  ) {
    game(id: $gameId) {
      takeTurn(
        playerId: $playerId
        takeGems: $gemList
        returnGems: $returnGemList
      ) {
        ...GameSelection
      }
    }
  }
  ${GAME_FRAGMENT}
`;

export { 
  CREATE_GAME_MUTATION,
  JOIN_GAME_MUTATION,
  PURCHASE_CARD_MUTATION,
  RESERVE_CARD_FROM_STACK_MUTATION, 
  RESERVE_CARD_MUTATION, 
  START_GAME_MUTATION,
  TAKE_COINS_MUTATION 
};
