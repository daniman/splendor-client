import { gql } from '@apollo/client';

const CARD_FRAGMENT = gql`
  fragment CardSelection on Card {
    id
    gemColor
    pointValue
    cost {
      gemColor
      quantity
    }
  }
`;

const PLAYER_FRAGMENT = gql`
  fragment PlayerSelection on Player {
    id
    score
    bank {
      gemColor
      quantity
    }
    nobles {
      ...CardSelection
    }
    reservedCards {
      ...CardSelection
    }
    purchasedCards {
      ...CardSelection
    }
  }
`;

const GAME_FRAGMENT = gql`
  fragment GameSelection on Game {
    id
    name
    state
    currentTurn {
      ...PlayerSelection
    }
    turns {
      playerId
      type
      when
      ... on TakeGems {
        gems
      }
      ... on PurchaseCard {
        card {
          gemColor
        }
      }
      ... on ReserveCard {
        cardType
        card {
          pointValue
          gemColor
        }
      }
    }
    players(currentPlayer: $playerId) {
      ...PlayerSelection
    }
    bank {
      gemColor
      quantity
    }
    nobles {
      ...CardSelection
    }
    cardStacks {
      type
      remaining
      cards {
        ...CardSelection
      }
    }
  }
  ${PLAYER_FRAGMENT}
  ${CARD_FRAGMENT}
`;

export { CARD_FRAGMENT, GAME_FRAGMENT, PLAYER_FRAGMENT };
