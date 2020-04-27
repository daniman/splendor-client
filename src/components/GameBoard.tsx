import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button } from '@apollo/space-kit/Button';
import { colors } from '@apollo/space-kit/colors';
import { Card, CARD_FRAGMENT } from './Card';
import { CoinStack } from './CoinStack';
import { CardRowAndStack } from './CardRowAndStack';
import { NobleCard } from './NobleCard';
import * as Types from '../types';

const GAME_BOARD_QUERY = gql`
  query GameBoard($gameId: ID!) {
    game(id: $gameId) {
      id
      name
      state
      players {
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
  }
  ${CARD_FRAGMENT}
`;

const TAKE_COINS_MUTATION = gql`
  mutation TakeCoins($gameId: ID!, $playerId: ID!, $gemList: [GemColor!]) {
    game(id: $gameId) {
      takeTurn(
        playerId: $playerId
        takeGems: $gemList # takeTwoGems: GREEN # takeThreeGems: [WHITE, RED, ] # purchaseCardById: "-2-2--1-"
      ) {
        id
        bank {
          gemColor
          quantity
        }
        player(id: $playerId) {
          id
          bank {
            gemColor
            quantity
          }
        }
      }
    }
  }
`;

const RESERVE_CARD_MUTATION = gql`
  mutation ReserveCard($gameId: ID!, $playerId: ID!, $cardId: ID!) {
    game(id: $gameId) {
      takeTurn(playerId: $playerId, reserveCardById: $cardId) {
        id
        cardStacks {
          type
          remaining
          cards {
            ...CardSelection
          }
        }
        player(id: $playerId) {
          id
          bank {
            gemColor
            quantity
          }
          reservedCards {
            ...CardSelection
          }
        }
        bank {
          gemColor
          quantity
        }
      }
    }
  }
  ${CARD_FRAGMENT}
`;

const PURCHASE_CARD_MUTATION = gql`
  mutation PurchaseCard($gameId: ID!, $playerId: ID!, $cardId: ID!) {
    game(id: $gameId) {
      takeTurn(playerId: $playerId, purchaseCardById: $cardId) {
        id
        cardStacks {
          type
          remaining
          cards {
            ...CardSelection
          }
        }
        nobles {
          ...CardSelection
        }
        player(id: $playerId) {
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
        bank {
          gemColor
          quantity
        }
      }
    }
  }
  ${CARD_FRAGMENT}
`;

export const GameBoard: React.FC<{ gameId: string }> = ({ gameId }) => {
  const { data, loading, error } = useQuery<Types.GameBoard>(GAME_BOARD_QUERY, {
    variables: { gameId },
  });
  const [takeGems, { error: takeGemsError }] = useMutation<Types.TakeCoins>(
    TAKE_COINS_MUTATION
  );
  const [purchaseCard, { error: purchaseCardError }] = useMutation<
    Types.ReserveCard
  >(PURCHASE_CARD_MUTATION);
  const [reserveCard, { error: reserveCardError }] = useMutation<
    Types.PurchaseCard
  >(RESERVE_CARD_MUTATION);

  const [showingPlayerId, setShowingPlayerId] = useState('');
  const [turnCoinState, setTurnCoinState] = useState<Types.GemColor[]>([]);
  const [
    turnCardState,
    setTurnCardState,
  ] = useState<Types.CardSelection | null>(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error.message}</div>;
  if (!data || !data.game) return <div>No game found :(</div>;

  const activePlayer =
    (showingPlayerId &&
      data.game.players.find((p) => p.id === showingPlayerId)) ||
    data.game.players[0];

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1 style={{ marginTop: 0, marginBottom: 40 }}>
            {data.game.name}
            {data.game.state === Types.GameState.COMPLETE && (
              <code style={{ marginLeft: 10 }}>This game is complete!</code>
            )}
          </h1>

          <div style={{ position: 'relative', marginBottom: 30 }}>
            <div style={{ display: 'flex' }}>
              {data.game.nobles.map((card) => (
                <NobleCard key={card.id} card={card} />
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', marginBottom: 40 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              {data.game.bank.map(({ gemColor, quantity }, i) => (
                <CoinStack
                  key={gemColor}
                  color={gemColor}
                  quantity={
                    quantity -
                    turnCoinState.filter((c) => c === gemColor).length
                  }
                  onSelect={(color) => {
                    setTurnCoinState([...turnCoinState, color]);
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            {data.game.cardStacks.map(({ type, remaining, cards }) => (
              <CardRowAndStack
                key={type}
                cards={cards}
                turnCardState={turnCardState}
                remaining={remaining}
                level={type === 'I' ? 1 : type === 'II' ? 2 : 3}
                onSelect={(card: Types.CardSelection) => {
                  setTurnCardState(card);
                }}
              />
            ))}
          </div>
        </div>

        <div className="col-md-6">
          <div className="row">
            <div className="col-md-9">
              <div>
                <h3 style={{ marginTop: 0 }}>
                  Build Turn:
                  <code style={{ marginLeft: 10 }}>{activePlayer.id}</code>
                </h3>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  {Array.from(new Set(turnCoinState))
                    .map((gemColor) => ({
                      gemColor,
                      quantity: turnCoinState.filter((c) => c === gemColor)
                        .length,
                    }))
                    .map(({ gemColor, quantity }) => (
                      <CoinStack
                        key={gemColor}
                        color={gemColor}
                        quantity={quantity}
                        onSelect={(color) => {
                          const i = turnCoinState.findIndex((c) => c === color);
                          turnCoinState.splice(i, 1);
                          setTurnCoinState([...turnCoinState]);
                        }}
                      />
                    ))}
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
                        },
                      })
                        .then(() => {
                          setTurnCoinState([]);
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
                          gameId: data.game!.id,
                          playerId: activePlayer.id,
                          cardId: turnCardState?.id,
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
                          gameId: data.game!.id,
                          playerId: activePlayer.id,
                          cardId: turnCardState?.id,
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
                    Reserve
                  </Button>
                </div>
                {takeGemsError && (
                  <div style={{ marginTop: 20 }}>
                    <code style={{ whiteSpace: 'nowrap' }}>
                      {takeGemsError.graphQLErrors
                        .map((e) => e.message)
                        .join('; ')}
                    </code>
                  </div>
                )}
                {purchaseCardError && (
                  <div style={{ marginTop: 20 }}>
                    <code style={{ whiteSpace: 'nowrap' }}>
                      {purchaseCardError.graphQLErrors
                        .map((e) => e.message)
                        .join('; ')}
                    </code>
                  </div>
                )}
                {reserveCardError && (
                  <div style={{ marginTop: 20 }}>
                    <code style={{ whiteSpace: 'nowrap' }}>
                      {reserveCardError.graphQLErrors
                        .map((e) => e.message)
                        .join('; ')}
                    </code>
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-3" style={{ textAlign: 'right' }}>
              <h4 style={{ marginTop: 0, marginBottom: 0 }}>Leaderboard:</h4>
              {data.game.players.map((p) => (
                <div key={p.id}>
                  {p.score ===
                    Math.max(...data.game!.players.map((p) => p.score)) && '👑'}
                  {p.id}:<code style={{ marginLeft: 10 }}>{p.score}</code>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', marginTop: 60, marginBottom: 20 }}>
            {data.game.players.map((p) => (
              <div
                key={p.id}
                className="clickable"
                onClick={() => {
                  setShowingPlayerId(p.id);
                }}
                style={{
                  flex: 1,
                  cursor: 'pointer',
                  backgroundColor:
                    p.id === activePlayer.id
                      ? 'rgba(255,255,255,0.2)'
                      : 'rgba(255,255,255,0.05)',
                  textAlign: 'center',
                  padding: 5,
                }}
              >
                {p.id}
              </div>
            ))}
          </div>

          <div key={activePlayer.id} style={{ display: 'flex' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              {activePlayer.bank.map(({ gemColor, quantity }) => (
                <CoinStack
                  key={gemColor}
                  color={gemColor}
                  quantity={quantity}
                />
              ))}
            </div>
          </div>

          {activePlayer.nobles.length > 0 && (
            <>
              <h3>Nobles:</h3>
              <div style={{ display: 'flex' }}>
                {activePlayer.nobles.map((card) => (
                  <NobleCard
                    key={card.id}
                    card={card}
                    title="You have attracted this noble with your great wealth."
                  />
                ))}
              </div>
            </>
          )}

          {activePlayer.reservedCards.length > 0 && (
            <>
              <h3>Reserved:</h3>
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', marginLeft: -10 }}>
                  {activePlayer.reservedCards.map((c) =>
                    turnCardState && c.id === turnCardState.id ? (
                      <div
                        key={c.id}
                        style={{
                          marginLeft: 10,
                          width: 100,
                          height: 100,
                          backgroundColor: 'rgba(255,255,255,0.01)',
                          display: 'flex',
                          borderRadius: 8,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <code>x</code>
                      </div>
                    ) : (
                      <Card
                        key={c.id}
                        card={c}
                        onSelect={() => {
                          setTurnCardState(c);
                        }}
                      />
                    )
                  )}
                </div>
              </div>
            </>
          )}

          <h3>Purchased:</h3>
          <div style={{ marginBottom: 40 }}>
            {activePlayer.purchasedCards.length ? (
              <div style={{ display: 'flex' }}>
                {data.game.bank.map(({ gemColor }) => (
                  <div>
                    {activePlayer.purchasedCards
                      .filter((c) => c.gemColor === gemColor)
                      .map((c, i) => (
                        <Card
                          card={c}
                          title="You own this card."
                          style={{
                            marginLeft: 0,
                            marginRight: 10,
                            marginTop: i === 0 ? 0 : -44,
                          }}
                        />
                      ))}
                  </div>
                ))}
              </div>
            ) : (
              <code>No purchased cards.</code>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
