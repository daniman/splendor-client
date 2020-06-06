import React from 'react';
import { colors } from '../config/colors';
import * as Types from '../types';

export const Miniboard: React.FC<{
  players: Types.GameBoard_game_players[];
  setShowingPlayerId: React.Dispatch<React.SetStateAction<string>>;
  showingPlayer: Types.GameBoard_game_players;
  activePlayer: Types.GameBoard_game_players;
  localPlayerId: String | null;
  ticker: string;
  gameState: Types.GameState;
}> = ({
  players,
  setShowingPlayerId,
  showingPlayer,
  activePlayer,
  localPlayerId,
  ticker,
  gameState,
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridAutoColumns: '1fr',
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      {gameState === Types.GameState.ACTIVE && (
        <div
          style={{
            gridRow: 1,
            gridColumn: players.findIndex((p) => p.id === activePlayer.id) + 1,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            marginBottom: 10,
          }}
        >
          <code style={{ fontSize: 12 }}>{ticker}</code>
          <span
            role="img"
            aria-label="thinking"
            style={{ marginLeft: 3, fontSize: 20 }}
          >
            🤔
          </span>
          <div
            style={{
              width: 10,
              border: '0px solid transparent',
              borderLeftWidth: 5,
              borderRightWidth: 5,
              borderTopWidth: 8,
              borderBottomWidth: 0,
              borderTopColor: '#e83e8c',
            }}
          />
        </div>
      )}
      {activePlayer.id !== localPlayerId &&
        players.findIndex((p) => p.id === localPlayerId) > -1 && (
          <div
            style={{
              gridRow: 1,
              gridColumn: players.findIndex((p) => p.id === localPlayerId) + 1,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              marginBottom: 10,
              alignSelf: 'end',
              opacity: 0.5,
            }}
          >
            <span style={{ marginBottom: 4, fontSize: 12 }}>you</span>
            <div
              style={{
                width: 10,
                border: '0px solid transparent',
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderTopWidth: 8,
                borderBottomWidth: 0,
                borderTopColor: 'white',
              }}
            />
          </div>
        )}
      {players.map((p, i) => (
        <div
          key={p.id}
          className="clickable"
          onClick={() => {
            setShowingPlayerId(p.id);
          }}
          style={{
            gridRow: 2,
            cursor: 'pointer',
            padding: 10,
            backgroundColor:
              p.id === showingPlayer.id
                ? 'rgba(255,255,255,0.2)'
                : 'rgba(255,255,255,0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
            }}
          >
            <div
              style={{
                wordBreak: 'break-word',
                flex: 1,
              }}
            >
              <span
                style={{
                  color: p.id === localPlayerId ? '#FFFFFF' : 'lightgrey',
                  fontWeight: p.id === localPlayerId ? 1000 : 500,
                }}
              >
                {p.id}
              </span>
            </div>
            <code style={{ flex: 'none', marginLeft: 5 }}>
              {Math.max(...players.map((p) => p.score)) === p.score &&
                p.score > 0 && (
                  <span role="img" aria-label="leading">
                    👑
                  </span>
                )}
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
                .map((c) => (
                  <div
                    key={c.id}
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
  );
};
