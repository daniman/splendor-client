import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button } from '@apollo/space-kit/Button';
import { colors } from '@apollo/space-kit/colors';
import { Card, CARD_FRAGMENT } from './Card';
import { CoinStack } from './CoinStack';

import * as Types from '../types';

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
    }
    players {
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
  activePlayer: Types.PlayerSelection;
  turnCardState: Types.CardSelection | null;
  setTurnCardState: Dispatch<SetStateAction<Types.CardSelection | null>>;
  turnCoinState: Types.GemColor[];
  setTurnCoinState: Dispatch<SetStateAction<Types.GemColor[]>>;
  returnCoinState: Types.GemColor[];
  setReturnCoinState: Dispatch<SetStateAction<Types.GemColor[]>>;
}> = ({
  gameId,
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
    Types.ReserveCard
  >(PURCHASE_CARD_MUTATION);
  const [reserveCard, { error: reserveCardError }] = useMutation<
    Types.PurchaseCard
  >(RESERVE_CARD_MUTATION);

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
                  onSelect={(color) => {
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
                    setReturnCoinState([...turnCoinState]);
                  }}
                />
              )}
            </>
          )
        )}
      </div>
      <div>
        {turnCardState && (
          <Card
            card={turnCardState}
            style={{ marginLeft: 0, marginRight: 0, marginTop: 10 }}
            onSelect={() => {
              setTurnCardState(null);
            }}
          />
        )}
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
          disabled={!turnCardState}
          onClick={() => {
            purchaseCard({
              variables: {
                gameId,
                playerId: activePlayer.id,
                cardId: turnCardState?.id,
                returnGemList: returnCoinState,
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
              .map((c) => c.id)
              .includes(turnCardState.id)
          }
          onClick={() => {
            reserveCard({
              variables: {
                gameId,
                playerId: activePlayer.id,
                cardId: turnCardState?.id,
              },
            })
              .then(() => {
                setTurnCardState(null);
                setReturnCoinState([]);
              })
              .catch((e) => {
                console.error(e.message);
              });
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
    </div>
  );
};
