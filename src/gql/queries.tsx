import { gql } from '@apollo/client';
import { GAME_FRAGMENT } from './fragments';

const ALL_GAMES_QUERY = gql`
  query AllGames {
    allGames {
      id
      name
      state
      players {
        id
      }
    }
  }
`;

const GAME_BOARD_QUERY = gql`
  query GameBoard($gameId: ID!, $playerId: ID) {
    game(id: $gameId) {
      ...GameSelection
      turns {
        when
      }
    }
  }
  ${GAME_FRAGMENT}
`;

const GAME_STATE_QUERY = gql`
  query GameStateQuery($gameId: ID!, $playerId: ID) {
    game(id: $gameId) {
      id
      state
    }
  }
`;

const GAME_TURN_QUERY = gql`
  query GamePage($gameId: ID!) {
    game(id: $gameId) {
      id
      name
      state
      currentTurn {
        id
      }
      turns {
        when
      }
    }
  }
`;

const LOBBY_QUERY = gql`
  query Lobby($gameId: ID!) {
    game(id: $gameId) {
      id
      name
      state
      players {
        id
      }
    }
  }
`;

export { ALL_GAMES_QUERY, GAME_BOARD_QUERY, GAME_STATE_QUERY, GAME_TURN_QUERY, LOBBY_QUERY };
