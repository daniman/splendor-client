import React from 'react';
import { colors } from '../config/colors';
import * as Types from '../types';

export const Miniboard: React.FC<{
  players: Types.GameBoard_game_players[];
  setShowingPlayerId: React.Dispatch<React.SetStateAction<string>>;
  showingPlayer: Types.GameBoard_game_players;
  activePlayer: Types.GameBoard_game_players;
  localPlayerId: String | null;
}> = ({ players, setShowingPlayerId, showingPlayer, activePlayer, localPlayerId}) => (
  <div style={{ display: 'flex', marginTop: 20, marginBottom: 20 }}>
    {players.map((p) => (
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
              wordBreak: 'break-word',
              flex: 1,
            }}
          >
            <span 
              style={{
                color: p.id === localPlayerId ? '#FFFFFF' : 'lightgrey',
                fontWeight: p.id === localPlayerId ? 1000 : 500
              }}
            >
              {p.id}
            </span> 
            {p.id === activePlayer.id && (
              <span style={{
                marginLeft: 10,
                fontWeight: p.id === localPlayerId ? 1000 : 500
              }} role="img" aria-label="thinking">🤔</span>
            )}
          </div>
          <code style={{ flex: 'none', marginLeft: 5 }}>
            {Math.max(...players.map((p) => p.score)) === p.score && p.score > 0 &&
              <span role="img" aria-label="leading">👑</span>
            }
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
)
