import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button } from '@apollo/space-kit/Button';
import { colors } from '@apollo/space-kit/colors';
import { Modal } from '@apollo/space-kit/Modal';
import { TextField } from '@apollo/space-kit/TextField';
import * as Types from '../types';

const LOBBY_QUERY = gql`
  query Lobby($gameId: ID!) {
    game(id: $gameId) {
      id
      players {
        id
      }
    }
  }
`;

const JOIN_GAME_MUTATION = gql`
  mutation JoinGame($gameId: ID!, $playerId: ID!) {
    game(id: $gameId) {
      join(playerId: $playerId) {
        id
        players {
          id
        }
      }
    }
  }
`;

const START_GAME_MUTATION = gql`
  mutation StartGame($gameId: ID!) {
    game(id: $gameId) {
      start {
        id
        state
      }
    }
  }
`;

const Small: React.FC = ({ children }) => (
  <i style={{ fontSize: 12, opacity: 0.8 }}>{children}</i>
);

export const Lobby: React.FC<{
  gameId: string;
}> = ({ gameId }) => {
  const { data, loading, error } = useQuery<Types.Lobby>(LOBBY_QUERY, {
    variables: { gameId },
  });
  const [joinGame, { loading: joinLoading, error: joinError }] = useMutation<
    Types.JoinGame
  >(JOIN_GAME_MUTATION);
  const [startGame, { loading: startLoading, error: startError }] = useMutation<
    Types.StartGame
  >(START_GAME_MUTATION, { variables: { gameId } });
  const [playerName, setPlayerName] = useState('');
  const [open, setOpen] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error.message}</div>;
  if (!data || !data.game) return <div>No game found :(</div>;

  const onClose = () => {
    setOpen(false);
    setPlayerName('');
  };

  return (
    <div className="container">
      <h1>
        Instance: <code>{gameId}</code>
      </h1>
      <h3>
        <span style={{ marginRight: 10 }}>Players:</span>
        <Small>(up to 4)</Small>
      </h3>
      {data.game.players.length > 0 ? (
        data.game.players.map((p, i) => (
          <div key={p.id}>
            <Small>#{i + 1}:</Small>
            <code style={{ marginLeft: 10 }}>{p.id}</code>
          </div>
        ))
      ) : (
        <code>No players have joined yet.</code>
      )}
      <div style={{ marginTop: 60 }}>
        <Button
          theme="dark"
          style={{ marginRight: 10 }}
          color={colors.pink.dark}
          disabled={data.game.players.length === 4}
          onClick={() => {
            setOpen(true);
          }}
        >
          Join Game
        </Button>
        {open && (
          <Modal
            className="text-black"
            title="Who would you like to join the game as?"
            size="small"
            onClose={onClose}
            primaryAction={
              <Button
                loading={joinLoading}
                color={colors.blue.base}
                onClick={() => {
                  joinGame({
                    variables: { gameId, playerId: playerName },
                  })
                    .then(onClose)
                    .catch((e) => {
                      console.error(e.message);
                    });
                }}
              >
                Join
              </Button>
            }
            secondaryAction={<Button onClick={onClose}>Cancel</Button>}
          >
            <TextField
              autoFocus={true}
              error={joinError?.graphQLErrors.map((e) => e.message).join('; ')}
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
          disabled={data.game.players.length < 2}
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
  );
};
