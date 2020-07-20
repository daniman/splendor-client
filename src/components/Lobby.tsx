import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button } from '@apollo/space-kit/Button';
import { colors } from '@apollo/space-kit/colors';
import { IconBack } from '@apollo/space-kit/icons/IconBack';
import { Modal } from '@apollo/space-kit/Modal';
import { TextField } from '@apollo/space-kit/TextField';
import { JOIN_GAME_MUTATION, START_GAME_MUTATION } from '../gql/mutations';
import { playWav } from '../modules/playWav';
import { cookie } from '../modules/cookie';

import * as Types from '../types';

export const Small: React.FC = ({ children }) => (
  <i style={{ fontSize: 12, opacity: 0.8, fontWeight: 400 }}>{children}</i>
);

export const Lobby: React.FC <{game: Types.Lobby_game}> = ({game}) => {
  const [joinGame, { loading: joinLoading, error: joinError }] = useMutation(JOIN_GAME_MUTATION);
  const [startGame, { loading: startLoading, error: startError }] = 
    useMutation(START_GAME_MUTATION, { variables: { gameId: game?.id} });
  const [playerName, setPlayerName] = useState('');
  const [open, setOpen] = useState(false);

  if (game) {
    const gameId = game.id;

    const onClose = () => {
      setOpen(false);
      setPlayerName('');
    };

    return (
      <>
        <div className="row">
          <h1>
            <Button
              title="Back to home."
              theme="dark"
              color={colors.grey.darker}
              style={{ color: 'white' }}
              as={<Link to="/" />}
              icon={<IconBack style={{ width: 12, height: 12 }} />}
            />
            <span style={{ marginLeft: 20 }}>
              {game.name}{' '}
              <code style={{ marginLeft: 10 }}>{game.id}</code>
            </span>
          </h1>
        </div>
        <div className="row">
          <h3>
            <span style={{ marginRight: 10 }}>Players:</span>
            <Small>(up to 4)</Small>
          </h3>
        </div>
        <div className="row">
          {game.players.length > 0 ? (
            <ol>
              {game.players.map((p, i) => (
                <li key={p.id}>
                  <code style={{ marginLeft: 10 }}>{p.id}</code>
                </li>
              ))}
            </ol>
          ) : (
            <code>No players have joined yet.</code>
          )}
        </div>
        <div className="row">
          <div style={{ marginTop: 20 }}>
            <Button
              theme="dark"
              style={{ marginRight: 10 }}
              color={colors.pink.dark}
              disabled={game.players.length === 4}
              onClick={() => {
                setOpen(true);
              }}
            >
              Join Game
            </Button>
            {open && (
              <Modal
                className="text-black"
                as={
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      playWav('smb3_enter_level');
                      joinGame({
                        variables: { gameId, playerId: playerName },
                      })
                        .then(() => {
                          cookie.set(`splendor:${gameId}`, playerName, 4);
                          onClose();
                        })
                        .catch((e) => {
                          console.error(e.message);
                        });
                    }}
                    noValidate={true}
                  />
                }
                title="Who would you like to join the game as?"
                size="small"
                onClose={onClose}
                primaryAction={
                  <Button
                    type="submit"
                    loading={joinLoading}
                    color={colors.blue.base}
                  >
                    Join
                  </Button>
                }
                secondaryAction={
                  <Button type="button" onClick={onClose}>
                    Cancel
                  </Button>
                }
              >
                <TextField
                  autoFocus={true}
                  error={joinError?.graphQLErrors
                    .map((e) => e.message)
                    .join('; ')}
                  className="width-full"
                  label="Player Name"
                  size="standard"
                  value={playerName}
                  onChange={(e) => {
                    setPlayerName(e.target.value);
                  }}
                />
              </Modal>
            )}
            <Button
              theme="dark"
              color={colors.blue.base}
              disabled={game.players.length < 2}
              loading={startLoading}
              onClick={() => {
                startGame().catch((e) => {
                  console.error(e.message);
                });
              }}
            >
              Start Game
            </Button>
          </div>
          {startError && (
            <div style={{ marginTop: 20 }}>
              <code>
                {startError.graphQLErrors.map((e) => e.message).join('; ')}
              </code>
            </div>
          )}
        </div>
      </>
    );
  } else {
    return <div>Game not found!</div>;
  }
};
