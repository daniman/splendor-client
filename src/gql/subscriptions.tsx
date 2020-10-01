import { gql } from '@apollo/client';
import { GAME_FRAGMENT } from './fragments';

const ALL_GAMES_SUBSCRIPTION = gql`
  subscription ALL_GAMES_SUBSCRIPTION {
    allGamesPub {
      id
      name
      state
      players {
        id
      }
    }
  }
`;

const GAME_BOARD_SUBSCRIPTION = gql`
  subscription GAME_BOARD_SUBSCRIPTION($gameId: ID!, $playerId: ID) {
    gameMutation(id: $gameId) {
      ...GameSelection
      turns {
        when
      }
    }
  }
  ${GAME_FRAGMENT}
`;

const LOBBY_SUBSCRIPTION = gql`
  subscription LOBBY_SUBSCRIPTION($gameId: ID!) {
    gameMutation(id: $gameId) {
      id
      name
      state
      players {
        id
      }
    }
  }
`;

export { ALL_GAMES_SUBSCRIPTION, GAME_BOARD_SUBSCRIPTION, LOBBY_SUBSCRIPTION };
