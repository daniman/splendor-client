import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button } from '@apollo/space-kit/Button';
import { colors } from '@apollo/space-kit/colors';
import { Card, PlaceholderCard, CARD_FRAGMENT } from './Card';
import { CoinStack } from './CoinStack';
import { TopOfDeck } from './Board';
import * as Types from '../types';
import { playWav } from '../modules/playWav';

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

export const GAME_FRAGMENT = gql`
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

export const TurnBuilder: React.FC<{
  gameId: string;
  goldAvailableInBank: boolean;
  activePlayer: Types.PlayerSelection;
  turnCardState: Types.CardSelection | TopOfDeck | null;
  setTurnCardState: Dispatch<
    SetStateAction<Types.CardSelection | TopOfDeck | null>
  >;
  turnCoinState: Types.GemColor[];
  setTurnCoinState: Dispatch<SetStateAction<Types.GemColor[]>>;
  returnCoinState: Types.GemColor[];
  setReturnCoinState: Dispatch<SetStateAction<Types.GemColor[]>>;
}> = ({
  gameId,
  goldAvailableInBank,
  activePlayer,
  turnCardState,
  setTurnCardState,
  turnCoinState,
  setTurnCoinState,
  returnCoinState,
  setReturnCoinState,
}) => {
  const [takeGems, { error: takeGemsError }] = useMutation<Types.TakeCoins>(
    TAKE_COINS_MUTATION
  );
  const [purchaseCard, { error: purchaseCardError }] = useMutation<
    Types.PurchaseCard
  >(PURCHASE_CARD_MUTATION);
  const [reserveCard, { error: reserveCardError }] = useMutation<
    Types.ReserveCard
  >(RESERVE_CARD_MUTATION);
  const [
    reserveCardFromStack,
    { error: reserveCardFromStackError },
  ] = useMutation<Types.ReserveCardFromStack>(RESERVE_CARD_FROM_STACK_MUTATION);

  return (
    <div style={{ marginBottom: 60 }}>
      <h3 style={{ marginTop: 0 }}>
        Build Your Turn:
        <code style={{ marginLeft: 10 }}>{activePlayer.id}</code>
      </h3>
      <div style={{ display: 'grid', width: 'fit-content' }}>
        {Array.from(new Set([...turnCoinState, ...returnCoinState])).map(
          (gemColor, i) => (
            <>
              {turnCoinState.filter((c) => c === gemColor).length > 0 && (
                <CoinStack
                  key={gemColor}
                  style={{ gridRow: 1, gridColumn: i + 1, alignSelf: 'end' }}
                  color={gemColor}
                  quantity={turnCoinState.filter((c) => c === gemColor).length}
                  onSelect={(color) => { // coin being returned from the turn builder
                    const i = turnCoinState.findIndex((c) => c === color);
                    turnCoinState.splice(i, 1);
                    setTurnCoinState([...turnCoinState]);
                  }}
                />
              )}
              {returnCoinState.filter((c) => c === gemColor).length > 0 && (
                <CoinStack
                  key={`inverted-${gemColor}`}
                  style={{ gridRow: 2, gridColumn: i + 1, alignSelf: 'start' }}
                  inverted={true}
                  color={gemColor}
                  quantity={
                    returnCoinState.filter((c) => c === gemColor).length
                  }
                  onSelect={(color) => {
                    const i = returnCoinState.findIndex((c) => c === color);
                    returnCoinState.splice(i, 1);
                    setReturnCoinState([...returnCoinState]);
                  }}
                />
              )}
            </>
          )
        )}
      </div>
      <div>
        {turnCardState &&
          (!!(turnCardState as Types.CardSelection).id ? (
            <Card
              card={turnCardState as Types.CardSelection}
              style={{ marginLeft: 0, marginRight: 0 }}
              onSelect={() => {
                setTurnCardState(null);
              }}
            />
          ) : (
            <PlaceholderCard label={(turnCardState as TopOfDeck).type} />
          ))}
      </div>
      <div style={{ marginTop: 20 }}>
        <Button
          size="small"
          theme="dark"
          color={colors.pink.base}
          style={{ marginRight: 10 }}
          disabled={turnCoinState.length === 0}
          onClick={() => {
            takeGems({
              variables: {
                gameId,
                playerId: activePlayer.id,
                gemList: turnCoinState,
                returnGemList: returnCoinState,
              },
            })
              .then(() => {
                setTurnCoinState([]);
                setReturnCoinState([]);
              })
              .catch((e) => {
                console.error(e.message);
              });
          }}
        >
          Take Gems
        </Button>
        <Button
          size="small"
          theme="dark"
          color={colors.pink.base}
          style={{ marginRight: 10 }}
          disabled={!turnCardState || !!(turnCardState as TopOfDeck).type}
          title={
            turnCardState && !!(turnCardState as TopOfDeck).type
              ? 'You cannot purchase a card from the top of a deck.'
              : ''
          }
          onClick={() => {
            purchaseCard({
              variables: {
                gameId,
                playerId: activePlayer.id,
                cardId: (turnCardState as Types.CardSelection)?.id,
              },
            })
              .then(() => {
                setTurnCardState(null);
              })
              .catch((e) => {
                console.error(e.message);
              });
          }}
        >
          Purchase
        </Button>
        <Button
          size="small"
          theme="dark"
          color={colors.pink.base}
          disabled={
            !turnCardState ||
            activePlayer.reservedCards
              .filter((c) => !!c)
              .map((c) => c!.id)
              .includes((turnCardState as Types.CardSelection).id)
          }
          onClick={() => {
            console.log('reserving', goldAvailableInBank);

            let confirmed = true;
            if (!goldAvailableInBank) {
              confirmed = window.confirm(
                'Are you sure you want to reserve with no YELLOW gems available?'
              );
            }

            if (confirmed) {
              if (
                turnCardState &&
                !!(turnCardState as Types.CardSelection).id
              ) {
                reserveCard({
                  variables: {
                    gameId,
                    playerId: activePlayer.id,
                    cardId: (turnCardState as Types.CardSelection)?.id,
                    returnGemList: returnCoinState,
                  },
                })
                  .then(() => {
                    setTurnCardState(null);
                    setReturnCoinState([]);
                  })
                  .catch((e) => {
                    console.error(e.message);
                  });
              } else {
                // reserve from top of deck
                reserveCardFromStack({
                  variables: {
                    gameId,
                    playerId: activePlayer.id,
                    stack: (turnCardState as TopOfDeck)?.type,
                    returnGemList: returnCoinState,
                  },
                })
                  .then(() => {
                    setTurnCardState(null);
                    setReturnCoinState([]);
                  })
                  .catch((e) => {
                    console.error(e.message);
                  });
              }
            }
          }}
        >
          Reserve
        </Button>
      </div>
      {takeGemsError && (
        <div style={{ marginTop: 20 }}>
          <code>
            {takeGemsError.graphQLErrors.map((e) => e.message).join('; ')}
          </code>
        </div>
      )}
      {purchaseCardError && (
        <div style={{ marginTop: 20 }}>
          <code>
            {purchaseCardError.graphQLErrors.map((e) => e.message).join('; ')}
          </code>
        </div>
      )}
      {reserveCardError && (
        <div style={{ marginTop: 20 }}>
          <code>
            {reserveCardError.graphQLErrors.map((e) => e.message).join('; ')}
          </code>
        </div>
      )}
      {reserveCardFromStackError && (
        <div style={{ marginTop: 20 }}>
          <code>
            {reserveCardFromStackError.graphQLErrors
              .map((e) => e.message)
              .join('; ')}
          </code>
        </div>
      )}
    </div>
  );
};
