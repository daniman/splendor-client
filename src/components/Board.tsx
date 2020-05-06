import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery, gql } from '@apollo/client';
import moment from 'moment';
import { LoadingSpinner } from '@apollo/space-kit/Loaders';
import { Card, PlaceholderCard } from './Card';
import { CardRowAndStack } from './CardRowAndStack';
import { NobleCard } from './NobleCard';
import { TurnBuilder, GAME_FRAGMENT } from './TurnBuilder';
import { Small } from './Lobby';
import { Bank } from './Bank';

import { colors } from '../config/colors';
import * as Types from '../types';

export type TopOfDeck = { type: Types.CardStackType };

const GAME_BOARD_QUERY = gql`
  query GameBoard($gameId: ID!, $playerId: ID) {
    game(id: $gameId) {
      ...GameSelection
    }
  }
  ${GAME_FRAGMENT}
`;

export const Board: React.FC<{ gameId: string }> = ({ gameId }) => {
  const { data, loading, error } = useQuery<Types.GameBoard>(GAME_BOARD_QUERY, {
    variables: { gameId, playerId: localStorage.getItem(`splendor:${gameId}`) },
    pollInterval: 3000,
  });

  const [showingPlayerId, setShowingPlayerId] = useState('');
  const [turnCoinState, setTurnCoinState] = useState<Types.GemColor[]>([]);
  const [returnCoinState, setReturnCoinState] = useState<Types.GemColor[]>([]);
  const [turnCardState, setTurnCardState] = useState<
    Types.CardSelection | TopOfDeck | null
  >(null);

  if (loading) return <LoadingSpinner theme="dark" size="small" />;
  if (error) return <div style={{ color: 'red' }}>{error.message}</div>;
  if (!data || !data.game) return <div>No game found :(</div>;

  const localPlayerId = localStorage.getItem(`splendor:${data.game.id}`);
  const activePlayer = data.game.currentTurn || data.game.players[0];
  const showingPlayer =
    (showingPlayerId &&
      data.game.players.find((p) => p.id === showingPlayerId)) ||
    data.game.players[0];

  const canAct =
    !!localPlayerId &&
    (localPlayerId === data.game.currentTurn?.id || localPlayerId === 'sudo');

  return (
    <>
      <Helmet>
        <title>
          {data.game.name} {canAct ? `| 👋 it's your turn!` : ''}
        </title>
      </Helmet>
      <code
        style={{
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 8,
          paddingRight: 8,
          position: 'absolute',
          backgroundColor: '#e83e8c',
          top: 0,
          right: 0,
          color: 'white',
        }}
      >
        {!!localPlayerId ? `playing as: ${localPlayerId}` : 'you are observing'}
      </code>
      <div className="row">
        <div className="col-lg-6">
          <div className="row" style={{ marginBottom: 40 }}>
            <div className="col-md-6">
              <h1 style={{ marginTop: 0, marginBottom: 20, lineHeight: 1 }}>
                {data.game.name}
                {data.game.state === Types.GameState.COMPLETE && (
                  <code style={{ marginLeft: 10 }}>
                    {
                      data.game.players.filter(
                        (p) =>
                          p.score ===
                          Math.max(...data.game!.players.map((q) => q.score))
                      )[0].id
                    }{' '}
                    wins!
                  </code>
                )}
              </h1>
              <h3 style={{ marginTop: 0 }}>
                It's <code>{activePlayer.id}</code>'s turn.
              </h3>
            </div>
          </div>

          <div style={{ position: 'relative', marginBottom: 30 }}>
            <div style={{ display: 'flex' }}>
              {data.game.nobles.map((card) => (
                <NobleCard key={card.id} card={card} />
              ))}
            </div>
          </div>

          <Bank
            bank={data.game.bank.map(({ gemColor, quantity }) => ({
              gemColor,
              quantity:
                quantity - turnCoinState.filter((c) => c === gemColor).length,
            }))}
            style={{ marginBottom: 40 }}
            onSelect={(color) => {
              canAct && setTurnCoinState([...turnCoinState, color]);
            }}
          />

          <div style={{ position: 'relative', marginBottom: 40 }}>
            {data.game.cardStacks.map(({ type, remaining, cards }) => (
              <CardRowAndStack
                key={type}
                cards={cards}
                turnCardState={turnCardState}
                remaining={remaining}
                level={type}
                onSelect={(card: Types.CardSelection | TopOfDeck) => {
                  canAct && setTurnCardState(card);
                }}
              />
            ))}
          </div>
        </div>

        <div className="col-lg-6">
          {canAct && (
            <TurnBuilder
              gameId={gameId}
              activePlayer={activePlayer}
              turnCardState={turnCardState}
              setTurnCardState={setTurnCardState}
              turnCoinState={turnCoinState}
              setTurnCoinState={setTurnCoinState}
              returnCoinState={returnCoinState}
              setReturnCoinState={setReturnCoinState}
            />
          )}

          <div style={{ display: 'flex', marginTop: 20, marginBottom: 20 }}>
            {data.game.players.map((p) => (
              <div
                key={p.id}
                className="clickable"
                onClick={() => {
                  setShowingPlayerId(p.id);
                }}
                style={{
                  flex: '1',
                  cursor: 'pointer',
                  backgroundColor:
                    p.id === showingPlayer.id
                      ? 'rgba(255,255,255,0.2)'
                      : 'rgba(255,255,255,0.05)',
                  padding: 10,
                }}
              >
                <div style={{ display: 'flex' }}>
                  <div
                    style={{
                      fontWeight: 900,
                      wordBreak: 'break-word',
                      flex: 1,
                    }}
                  >
                    {p.id}
                    {p.id === activePlayer.id && (
                      <span
                        style={{ marginLeft: 10 }}
                        role="img"
                        aria-label="thinking"
                      >
                        🤔
                      </span>
                    )}
                  </div>
                  <code style={{ flex: 'none', marginLeft: 5 }}>
                    {Math.max(...data.game!.players.map((p) => p.score)) ===
                      p.score &&
                      p.score > 0 &&
                      '👑'}
                    {p.score}
                  </code>
                </div>

                {Array.from(
                  new Set([
                    ...p.bank.map((b) => b.gemColor),
                    ...p.purchasedCards.map((c) => c.gemColor),
                  ])
                ).map((gemColor) => (
                  <div key={gemColor || ''} style={{ lineHeight: 1 }}>
                    {p.purchasedCards
                      .filter((c) => c.gemColor === gemColor)
                      .map((i) => (
                        <div
                          key={`${gemColor}-${i}`}
                          style={{
                            display: 'inline-block',
                            marginRight: 2,
                            height: 10,
                            width: 10,
                            backgroundColor: !!gemColor
                              ? colors[gemColor]
                              : '#FFFFFF',
                          }}
                        />
                      ))}
                    {p.bank
                      .filter((b) => b.gemColor === gemColor)
                      .map(({ quantity }) =>
                        new Array(quantity).fill(0).map((_, i) => (
                          <div
                            key={`${i}`}
                            style={{
                              display: 'inline-block',
                              marginRight: 2,
                              borderRadius: 5,
                              height: 10,
                              width: 10,
                              backgroundColor: !!gemColor
                                ? colors[gemColor]
                                : '#FFFFFF',
                            }}
                          />
                        ))
                      )}
                  </div>
                ))}

                <div style={{ lineHeight: 1 }}>
                  {p.reservedCards.map((c, i) => (
                    <div
                      key={i}
                      style={{
                        height: 10,
                        display: 'inline-block',
                        width: 10,
                        marginRight: 2,
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: 1,
                          width: 14,
                          position: 'absolute',
                          transform: 'rotate(45deg)',
                          transformOrigin: 'left',
                          backgroundColor: '#e83e8c',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Bank
            bank={showingPlayer.bank.map(({ gemColor, quantity }) => ({
              gemColor,
              quantity:
                quantity - returnCoinState.filter((c) => c === gemColor).length,
            }))}
            onSelect={(color) => {
              canAct && setReturnCoinState([...returnCoinState, color]);
            }}
          />

          {showingPlayer.nobles.length > 0 && (
            <>
              <h3>Nobles:</h3>
              <div style={{ display: 'flex', marginBottom: 40 }}>
                {showingPlayer.nobles.map((card) => (
                  <NobleCard
                    key={card.id}
                    card={card}
                    title="You have attracted this noble with your great wealth."
                  />
                ))}
              </div>
            </>
          )}

          <h3>Purchased:</h3>
          <div style={{ marginBottom: 40 }}>
            {showingPlayer.purchasedCards.length ? (
              <div style={{ display: 'flex' }}>
                {data.game.bank.map(({ gemColor }) => (
                  <div key={gemColor}>
                    {showingPlayer.purchasedCards
                      .filter((c) => c.gemColor === gemColor)
                      .map((c, i) => (
                        <Card
                          key={c.id}
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

          {showingPlayer.reservedCards.length > 0 && (
            <>
              <h3>Reserved:</h3>
              <div>
                <div style={{ display: 'flex' }}>
                  {showingPlayer.reservedCards.map((c, i) =>
                    !!c ? (
                      turnCardState &&
                      c.id === (turnCardState as Types.CardSelection).id ? (
                        <PlaceholderCard label="x" />
                      ) : (
                        <Card
                          key={c.id}
                          card={c}
                          onSelect={() => {
                            canAct && setTurnCardState(c);
                          }}
                          style={{ marginLeft: 0, marginRight: 10 }}
                        />
                      )
                    ) : (
                      <PlaceholderCard
                        key={i}
                        label="SECRET"
                        style={{ marginRight: 10 }}
                      />
                    )
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <h3 style={{ marginTop: 0 }}>Turn Log:</h3>
          {data.game.turns
            .slice()
            .reverse()
            .map((t, i) => (
              <div key={i}>
                <span
                  style={{ marginRight: 10, opacity: 0.8 }}
                  className="mono"
                >
                  {moment(t.when).format('h:mm')}
                </span>
                <code>{t.playerId}</code>{' '}
                {t.__typename === 'TakeGems' ? (
                  <span>
                    <Small>took</Small> <code>{t.gems.join(',')}</code>{' '}
                    <Small>gems</Small>
                  </span>
                ) : t.__typename === 'PurchaseCard' ? (
                  <span>
                    <Small>purchased a</Small>{' '}
                    <code>{t.card ? t.card.gemColor : 'mysterious'}</code>{' '}
                    <Small>card</Small>
                  </span>
                ) : (
                  <span>
                    <Small>reserved a</Small>{' '}
                    {t.card ? (
                      <span>
                        <code>{t.card.pointValue}</code> <Small>point</Small>{' '}
                        <code>{t.card.gemColor}</code>
                      </span>
                    ) : t.cardType ? (
                      <code>TYPE {t.cardType}</code>
                    ) : (
                      <code>MYSTERY</code>
                    )}{' '}
                    <Small>card</Small>
                  </span>
                )}{' '}
                <Small>{moment(t.when).fromNow()}</Small>.
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
